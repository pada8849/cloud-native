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
      - name: jenkins-home
        mountPath: /home/jenkins
      - mountPath: /app/jar
        name: jenkins-jar
  - name: maven
    image: 10.0.1.125:5000/library/maven:3.6-jdk-8-alpine
    imagePullPolicy: Always
    command:
    - cat
    tty: true
    volumeMounts:
      - name: jenkins-home
        mountPath: /home/jenkins
      - mountPath: /app/jar
        name: jenkins-jar
      - mountPath: /tmp/.m2
        name: jenkins-cache
  volumes:
    - name: jenkins-home
      persistentVolumeClaim:
        claimName: jenkins-pvc
"""
) {
    node(POD_LABEL)  {
        workdir="/home/jenkins/workdir"
        imageurl="192.168.11.14:5000"
        container('maven') {
            def workdir = pwd();
            def build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            script {
                if (!fileExists("${workdir}")) {
                    sh "mkdir -p ${workdir}"
                    dir ("${workdir}") {
                        def repositoryUrl = scm.userRemoteConfigs[0].url
                        sh "git init"
                        sh "git remote add origin ${repositoryUrl}"
                        sh "git checkout -b master"
                        sh "git pull origin master"
                    }
                } else {
                    dir ("${workdir}") {
                        sh "git pull origin master"
                    }
                }

                dir ("${workdir}"){
                    sh "ls && pwd"
                    sh "cd chapter-3/cicd/ci/api/code && git init &&  \
                              git remote add origin https://gitee.com/jishenghua/JSH_ERP.git &&  \
                              git config core.sparsecheckout true && \
                              echo 'jshERP-boot' >> .git/info/sparse-checkout && ls && \
                              git pull --depth 1 origin master && \
                              mv jshERP-boot/* . && cd .. && ls && \
                              cp -af settings.xml code && ls && \
                              cp -af application.yml code/src/main/resources/application.yml \
                              && rm -f code/src/main/resources/application.properties && \
                              cd code && ls "
                    sh "cd chapter-3/cicd/ci/api/code && \
                              mvn clean -s settings.xml && \
                              mvn -s settings.xml -e -B package"
                    sh "cd chapter-3/cicd/ci/api && chmod +x copy.sh && ./copy.sh"
                }
            }
        }
        container('kaniko') {
            sh 'cp -af /app/*.jar .'
            sh '/kaniko/executor -f Dockerfile -c . --destination=your_registry/your_repo:build_tag'
        }
    }
}
