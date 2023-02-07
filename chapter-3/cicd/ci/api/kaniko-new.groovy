podTemplate(
        yaml: """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: mltp
    image: kili-docker.pkg.coding.net/ebes/ot/inbound-agent:3077.vd69cf116da_6f-3-jdk11
  - name: kaniko
    image: kili-docker.pkg.coding.net/ebes/ot/executor:debug
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
    image: kili-docker.pkg.coding.net/ebes/ot/maven:3.6-jdk-8-alpine
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
"""
) {
    node(POD_LABEL)  {
        workdir="/home/jenkins/agent/workspace/kaniko"
        imageurl="192.168.11.14:5000"
        container('jnlp'){
            script {
                sh 'pwd && ls'
                dir ("${workdir}") {
                    def repositoryUrl = scm.userRemoteConfigs[0].url
                    sh "git init"
                    sh "git remote add origin ${repositoryUrl}"
                    sh "git checkout -b master"
                    sh "git pull origin master"
                }
            }
        }
        build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
        container('maven') {
            script {
                dir ("${workdir}"){
                    sh "ls && pwd"
                    sh "cd chapter-3/cicd/ci/api && \
                              cp -af settings.xml code  && \
                              cp -af application.yml code/src/main/resources/application.yml && \
                              cd code && ls "
                    sh "cd chapter-3/cicd/ci/api/code && \
                              mvn clean -s settings.xml && \
                              mvn -s settings.xml -e -B package"
                    sh "cd chapter-3/cicd/ci/api && chmod +x copy.sh && ./copy.sh"
                }
            }
        }
        container('kaniko') {
            sh 'cp -af /app/jar/*.jar .'
            sh '/kaniko/executor -f Dockerfile -c . --destination=your_registry/your_repo:build_tag'
        }
    }
}
