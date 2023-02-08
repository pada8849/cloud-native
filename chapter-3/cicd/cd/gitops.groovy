podTemplate(
        yaml: """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: jnlp
    image: ${REGISTRY}/library/inbound-agent-kubectl:latest
"""
) {
    node(POD_LABEL)  {
        workdir="${WORKSPACE}"
        cidir="${workdir}/chapter-3/cicd/ci/api"
        cddir="${workdir}/chapter-3/cicd/cd"
        imageurl="${REGISTRY}/library"
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
                        sh "sleep 1000"
                        sh """
                    sed -i 's/IMAGE_TAG/${build_tag}/g' api-manifest.yaml
                    """
                        sh "kubectl apply -f api-manifest.yaml --kubeconfig=${kubeconfig}"
                        sh "https://api.github.com/repos/pada8849/cloud-native/contents/chapter-3/gitops/aa.yaml"
                    }
                }
            }
    }
    }

