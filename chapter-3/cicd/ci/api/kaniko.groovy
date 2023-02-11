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
      - name: github-token
        mountPath: /tmp/git 
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
    - name: github-token
      configMap:
        name: github
"""
) {
    node(POD_LABEL)  {
        workdir="${WORKSPACE}"
        cidir="${workdir}/chapter-3/cicd/ci/api"
        cddir="${workdir}/chapter-3/cicd/cd"
        gitopsfile = "https://api.github.com/repos/pada8849/cloud-native/contents/chapter-3/gitops/yaml/aa.yaml"
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
                        script {
                            sh """
                                sed -e 's#{CODE}#${imageurl}#g' api-manifest.yaml > deployment.yaml
                               """
                        if ("${CDOPS}"=="gitops"){
                            base64txt = sh(returnStdout: true, script: 'base64 -w 0 deployment.yaml')
                            shatxt = sh(returnStdout: true, script: "curl -X GET \'${gitopsfile}\' \
                                      -H \'Authorization: token ${gittoken}\' \
                                      -H \'Content-Type: application/json\' \
                                            | jq '.[0].sha' ")
                            jsondata = "{ \"message\": \"gitops file\", \
                                      \"content\": \"${base64txt}\", \
                                      \"sha\": \"${shatxt}\" \
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

