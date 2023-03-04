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
        cidir="${workdir}/chapter-6/cicd/ci/api"
        cddir="${workdir}/chapter-6/cicd/cd"
        deployfile = "https://api.github.com/repos/pada8849/cloud-native/contents/chapter-3/gitops/yaml/${CLUSTER}/${JOB_NAME}-deploy.yaml"
        weightvsfile = "https://api.github.com/repos/pada8849/cloud-native/contents/chapter-3/gitops/yaml/${CLUSTER}/${JOB_NAME}-vs.yaml"
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
                            if ("${STEP}"=="CICD"){
                                sh "cd code && git clone https://gitee.com/jishenghua/JSH_ERP.git && mv JSH_ERP/jshERP-boot/* . && rm -rf JSH_ERP "
                            }
                        }
                    }
                }
            }
            stage('mvn 构建') {
                build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                imageurl="${REGISTRY}/library/${JOB_NAME}:${build_tag}"
                container('maven') {
                    script {
                        if ("${STEP}"=="CICD"){
                            dir("${cidir}") {
                                sh "cp -af settings.xml code  && \
                                      cp -af application.yml code/src/main/resources/application.yml && \
                                      cp -af pom.xml code/pom.xml && \
                                      rm -f code/src/main/resources/application.properties"
                                sh "cd code && \
                                      mvn clean -s settings.xml && \
                                      mvn -s settings.xml -e -B package"
                                sh "chmod +x copy.sh && ./copy.sh"
                            }
                        }
                    }
                }
            }
            stage('构建运行镜像') {
                container('kaniko') {
                    dir("${cidir}") {
                        if ("${STEP}"=="CICD"){
                        sh 'cp -af /app/jar/*.jar .'
                        sh "executor -f Dockerfile -c . -d ${imageurl}"
                        }
                    }
                }
            }
            stage('进行部署') {
                container('jnlp') {
                    dir("${cddir}") {
                        script {
                            if ("${CDRATE}"=="100"){
                                v1weght=100;
                                v2weght=0;
                                manifestfile="api-manifest.yaml"
                            }else {
                                v2weght="${CDRATE}";
                                v1weght="100-${CDRATE}";
                                manifestfile="api-v2-manifest.yaml"
                            }

                            sh """
                                sed -e 's#{CODE}#${imageurl}#g' ${manifestfile} > deployment.yaml
                                sed -e 's#{V1WEIGHT}#${v1weght}#g;s#{V2WEIGHT}#${v2weght}#g' jsh-vs.yaml > vs.yaml
                               """
                            if ("${CDOPS}"=="gitops"){
                                base64txt = sh(returnStdout: true, script: 'base64 -w 0 deployment.yaml')
                                shatxt = sh(returnStdout: true, script: "curl -X GET \'${deployfile}\' -H \'Authorization: token ${gittoken}\' -H \'Content-Type: application/json\' | jq \'.sha\' ").trim()

                                jsondata = "{ \"message\": \"gitops file\", \
                                          \"content\": \"${base64txt}\", \
                                          \"sha\": ${shatxt} \
                                        }"
                                sh """
                                    curl -X PUT \
                                      ${deployfile} \
                                      -H 'Authorization: token ${gittoken}' \
                                      -H 'Content-Type: application/json' \
                                      -d '${jsondata}'
                                   """
                                vsbase64txt = sh(returnStdout: true, script: 'base64 -w 0 deployment.yaml')
                                vsshatxt = sh(returnStdout: true, script: "curl -X GET \'${weightvsfile}\' -H \'Authorization: token ${gittoken}\' -H \'Content-Type: application/json\' | jq \'.sha\' ").trim()

                                vsjsondata = "{ \"message\": \"gitops file\", \
                                          \"content\": \"${vsbase64txt}\", \
                                          \"sha\": ${vsshatxt} \
                                        }"
                                sh """
                                    curl -X PUT \
                                      ${weightvsfile} \
                                      -H 'Authorization: token ${gittoken}' \
                                      -H 'Content-Type: application/json' \
                                      -d '${vsjsondata}'
                                   """
                            }else{
                                sh "kubectl apply -f deployment.yaml,vs.yaml --kubeconfig=${kubeconfig}"
                            }
                        }
                    }
                }
            }
    }
    }

