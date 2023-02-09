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
      - name: github-token
        mountPath: /tmp/git 
  volumes:
    - name: github-token
      configMap:
        name: github
"""
) {
    node(POD_LABEL)  {
        workdir="${WORKSPACE}"
        cidir="${workdir}/chapter-3/cicd/ci/api"
        cddir="${workdir}/chapter-3/cicd/cd"
        imageurl="${REGISTRY}/library"
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
                    }
                }
            }
            stage('进行部署') {
                container('jnlp') {
                    dir("${cddir}") {
                        sh """
                    sed -e 's#{CODE}#${imageurl}#g' api-manifest.yaml > deployment.yaml
                    """
                        base64txt = sh(returnStdout: true, script: 'base64 -w 0 deployment.yaml')
                        shatxt = sh(returnStdout: true, script: 'echo -n  $base64txt | sha1sum |  awk \'{print $1}\'').trim()
                        jsondata = "{ \"message\": \"gitops file\", \
                                      \"content\": \"${base64txt}\", \
                                      \"sha\": \"${shatxt}\" \
                                    }"
                        sh """
                    curl -X PUT \
                      https://api.github.com/repos/pada8849/cloud-native/contents/chapter-3/gitops/yaml/aa.yaml \
                      -H 'Authorization: token ${gittoken}' \
                      -H 'Content-Type: application/json' \
                      -d '${jsondata}'
                    """
                    }
                }
            }
    }
    }

