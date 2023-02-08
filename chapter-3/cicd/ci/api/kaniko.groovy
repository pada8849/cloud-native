podTemplate(
        yaml: """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: nltp
    image: 10.0.1.125:5000/library/inbound-agent:3077.vd69cf116da_6f-3-jdk11
    volumeMounts:
      - name: workspace-volume
        mountPath: /home/jenkins/agent    
      - name: kube-config
        mountPath: /tmp/kube    
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
    - name: kube-config
      configMap:
        name: kube
"""
) {
    node(POD_LABEL)  {
        workdir="/home/jenkins/agent/workspace/kaniko"
        imageurl="10.0.1.125:5000/library"
        kubeconfig="/tmp/kube/config"
        container('jnlp'){
            script {
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
                sh "cd chapter-3/cicd/ci/api && ls && pwd && executor -f Dockerfile -c . -d ${imageurl}/api:${build_tag}"
            }
        }
        container('jnlp'){
            script {
                dir ("${workdir}") {
                    sh "cd chapter-3/cicd/cd"
                    sh """
                    sed -i 's/IMAGE_PATH/${build_tag}/g' api-manifest.yaml
                    """
                    sh "kubectl apply -f api-manifest.yaml --kubeconfig=${kubeconfig}"
                }
            }
        }
    }
}
