podTemplate(
        yaml: """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: jnlp
    image: ${REGISTRY}/library/inbound-agent-kubectl:latest
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent    
      - name: kube-config
        mountPath: /tmp/kube    
  - name: kaniko
    image: ${REGISTRY}/library/executor:debug
    imagePullPolicy: Always
    command:
    - cat
    tty: true
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent
  - name: node
    image: ${REGISTRY}/library/node:lts-buster
    imagePullPolicy: Always
    command:
    - cat
    tty: true
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent
      - mountPath: /tmp/.yarn
        name: jenkins-cache
  volumes:
    - name: jenkins-cache
      persistentVolumeClaim:
        claimName: jenkins-cache
    - name: kube-config
      configMap:
        name: kube
"""
) {
    node(POD_LABEL)  {
        workdir="${WORKSPACE}"
        cidir="${workdir}/chapter-3/cicd/ci/web"
        codedir="${workdir}/chapter-3/cicd/ci/web/code"
        cddir="${workdir}/chapter-3/cicd/cd"

        kubeconfig="/tmp/kube/config"
            stage('检出代码') {
                container('jnlp') {
                    script {
                        dir("${workdir}") {
                            def repositoryUrl = scm.userRemoteConfigs[0].url
                            sh "git init"
                            sh "git remote add origin ${repositoryUrl}"
                            sh "git checkout -b master"
                            sh "git pull origin master"
                        }
                        dir("${codedir}") {
                            sh "git clone https://gitee.com/jishenghua/JSH_ERP.git && mv JSH_ERP/jshERP-web/* . && rm -rf JSH_ERP "
                        }
                    }
                }
            }
            stage('node 构建') {
                build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                imageurl="${REGISTRY}/library/${JOB_NAME}:${build_tag}"
                container('node') {
                    script {
                        dir("${codedir}") {
                            sh "YARN_CACHE_FOLDER=/tmp/.yarn yarn install && \
                                yarn build"
                        }
                    }
                }
            }
            stage('构建运行镜像') {
                container('kaniko') {
                    dir("${cidir}") {
                        sh "executor -f Dockerfile -c . -d ${imageurl}"
                    }
                }
            }
            stage('进行部署') {
                container('jnlp') {
                    dir("${cddir}") {
                        sh """
                    sed -e 's#{CODE}#${imageurl}#g' web-manifest.yaml > deployment.yaml
                    """
                        sh "kubectl apply -f deployment.yaml --kubeconfig=${kubeconfig}"
                    }
                }
            }
    }
    }

