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
      - mountPath: /app/jar
        name: jenkins-jar
  - name: maven
    image: ${REGISTRY}/library/maven:3.6-jdk-8-alpine
    imagePullPolicy: Always
    command:
    - cat
    tty: true
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent
      - mountPath: /app/jar
        name: jenkins-jar
      - mountPath: /tmp/.m2
        name: jenkins-cache
  volumes:
    - name: jenkins-jar
      persistentVolumeClaim:
        claimName: jenkins-jar
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
        cidir="${workdir}/chapter-3/cicd/ci/api"
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
                        dir("${cidir}") {
                            sh "cd code && git clone https://gitee.com/jishenghua/JSH_ERP.git && mv JSH_ERP/jshERP-boot/* . && rm -rf JSH_ERP "
                        }
                    }
                }
            }
            stage('mvn 构建') {
                build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                imageurl="${REGISTRY}/library/${JOB_NAME}:${build_tag}"
                container('maven') {
                    script {
                        dir("${cidir}") {
                            sh "cp -af settings.xml code  && \
                                  cp -af application.yml code/src/main/resources/application.yml && \
                                  rm -f code/src/main/resources/application.properties"
                            sh "cd code && \
                                  mvn clean -s settings.xml && \
                                  mvn -s settings.xml -e -B package"
                            sh "chmod +x copy.sh && ./copy.sh"
                        }
                    }
                }
            }
            stage('构建运行镜像') {
                container('kaniko') {
                    dir("${cidir}") {
                        sh 'cp -af /app/jar/*.jar .'
                        sh "executor -f Dockerfile -c . -d ${imageurl}"
                    }
                }
            }
            stage('进行部署') {
                container('jnlp') {
                    dir("${cddir}") {
                        sh """
                    sed -e 's#{CODE}#${imageurl}#g' api-manifest.yaml > deployment.yaml
                    """
                        sh "kubectl apply -f deployment.yaml --kubeconfig=${kubeconfig}"
                    }
                }
            }
    }
    }

