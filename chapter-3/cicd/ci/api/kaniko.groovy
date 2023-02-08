podTemplate(
        yaml: """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: kaniko
    image: 10.0.1.125:5000/library/executor:debug
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
    image: 10.0.1.125:5000/library/maven:3.6-jdk-8-alpine
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
        imageurl="10.0.1.125:5000/library"
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
                    sh "cd chapter-3/cicd/ci/api && \
                              cp -af settings.xml code  && \
                              cp -af application.yml code/src/main/resources/application.yml"
                    sh "cd chapter-3/cicd/ci/api/code && \
                              mvn clean -s settings.xml && \
                              mvn -s settings.xml -e -B package"
                    sh "cd chapter-3/cicd/ci/api && chmod +x copy.sh && ./copy.sh"
                }
            }
        }
        container('kaniko') {
            dir ("${workdir}") {
                sh 'cd chapter-3/cicd/ci/api && cp -af /app/jar/*.jar .'
                sh "cd chapter-3/cicd/ci/api && executor -f Dockerfile -c . -d ${imageurl}/api:${build_tag}"
            }
        }
    }
}
