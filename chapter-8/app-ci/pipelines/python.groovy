podTemplate(
        yaml: """
kind: Pod
metadata:
  name: kaniko
  annotations:
    sidecar.istio.io/inject: "false"
spec:
  containers:
  - name: jnlp
    image: ${REGISTRY}/library/inbound-agent-kubectl:latest
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent
      - name: kube-config
        mountPath: /tmp/kube
      - name: github-token
        mountPath: /tmp/git
  - name: kaniko
    image: ${REGISTRY}/library/executor:debug
    command:
    - cat
    tty: true
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent
      - mountPath: /tmp/.cache/pip
        name: jenkins-cache
  - name: build
    image: ${REGISTRY}/python39-build:latest
    command:
    - cat
    tty: true
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent
      - mountPath: /tmp/.cache/pip
        name: jenkins-cache
  volumes:
    - name: jenkins-cache
      persistentVolumeClaim:
        claimName: jenkins-cache
    - name: kube-config
      configMap:
        name: kube
    - name: github-token
      configMap:
        name: github
"""
) {
    node(POD_LABEL)  {
        workdir="${WORKSPACE}"
        cidir="${workdir}/app-ci/python"
        cddir="${workdir}/app-cd"
        gitopsfile = "https://api.github.com/repos/pada8849/cloud-native/contents/chapter-8/app-cd/using/${CLUSTER}/${JOB_NAME}-deploy.yaml"
        gittoken = sh(returnStdout: true, script: 'cat /tmp/git/token').trim()
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
                        dir("${cidir}") {
                            sh "cd code && git clone ${CODE_REPO} "
                        }
                    }
                }
            }
            stage('python 构建') {
                build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                imageurl="${REGISTRY}/library/${JOB_NAME}:${build_tag}"
                container('build') {
                    script {
                        dir("${cidir}") {
                            sh "pip config set global.cache-dir \"/tmp/.cache/pip\" && pip install -r requirements.txt "

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
                        script {
                            sh """
                                sed -e 's#{CODE}#${imageurl}#g;s#{PORT}#${PORT}#g;s#{PROJECT}#${JOB_NAME}#g' deploy-template.yaml > deployment.yaml
                               """
                        if ("${CDOPS}"=="gitops"){
                            base64txt = sh(returnStdout: true, script: 'base64 -w 0 deployment.yaml')
                            shatxt = sh(returnStdout: true, script: "curl -X GET \'${gitopsfile}\' -H \'Authorization: token ${gittoken}\' -H \'Content-Type: application/json\' | jq \'.sha\' ").trim()

                            jsondata = "{ \"message\": \"gitops file\", \
                                      \"content\": \"${base64txt}\", \
                                      \"sha\": ${shatxt} \
                                    }"
                            sh """
                                curl -X PUT \
                                  ${gitopsfile} \
                                  -H 'Authorization: token ${gittoken}' \
                                  -H 'Content-Type: application/json' \
                                  -d '${jsondata}'
                               """
                        }else{
                            sh "kubectl apply -f deployment.yaml --kubeconfig=${kubeconfig}"
                        }
                        }
                    }
                }
            }
    }
    }

