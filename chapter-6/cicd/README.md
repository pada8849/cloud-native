# 基于K8S 持续交付操作
### 准备工具
#### 安装 jenkins
    helm repo add jenkins https://charts.jenkins.io
    helm repo update
    kubectl create ns ci
    helm install jenkins jenkins/jenkins -nci
    kubectl edit svc -nci jenkins #将 type 改为 NodePort
    kubectl get svc -nci #获取 jenkins nodeport 端口号
    kubectl get secret -nci jenkins -o yaml | grep jenkins-admin-password: | awk '{print $2}' | base64 --decode
    或者kubectl get secret -n ci jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 -D
    通过http://<节点 ip:以上端口号>/manage/pluginManager/updates/ 访问插件更新中心，使用上一步获取的密码，更新对应插件并安装Generic Webhook Trigger
#### 安装 flux 并进行集群配置
    curl -s https://fluxcd.io/install.sh | sudo bash 
    #使用常规 git 仓库
    flux bootstrap git \
      --url=https://<host>/<org>/<repository> \
      --username=<my-username> \
      --password=<my-password> \
      --token-auth=true \
      --path=clusters/my-cluster
    #使用 github 仓库
    export GITHUB_TOKEN=<your-token>
    export GITHUB_USER=<your-username>
    flux bootstrap github \
      --owner=$GITHUB_USER \
      --repository=fleet-infra \
      --branch=main \
      --path=./clusters/my-cluster \
      --personal
### 操作过程
#### 准备镜像
    #基于inbound-agent制作一个包含 kubectl 的基础镜像
    cd chapter-3/cicd
    #下载 jq 以在 shell 请求中进行 json 读取
    curl -fL "https://kinshy-generic.pkg.coding.net/south/study/jq-linux64?version=latest" -o jq-linux64 && chmod +x jq-linux64
    #下载 kubectl以便在容器中进行k8s 集群操作
    curl -fL "https://kinshy-generic.pkg.coding.net/south/study/kubectl-linux64?version=latest" -o kubectl-linux64 && chmod +x kubectl-linux64
    docker build -t <镜像仓库 ip:端口>/library/inbound-agent-kubectl:latest .
    docker pull gcr.io/kaniko-project/executor:debug
    docker tag <镜像仓库 ip:端口>/library/executor:debug
    docker pull maven:3.6-jdk-8-alpine
    docker tag <镜像仓库 ip:端口>/library/maven:3.6-jdk-8-alpine
    docker pull openjdk:8-jre-alpine
    docker tag <镜像仓库 ip:端口>/library/openjdk:8-jre-alpine
#### 准备集群配置
    cd chapter-2/cicd/ci/api && kubectl apply -f persistentvolumeclaim.yaml
    #在命名空间 ci 下创建一个 configmap 名为 kube, 键为 config, 值为 kubeconfig 文件内容，注意server ip 改为局域网 ip
#### 准备代码
    #将前述课程中的后端代码拷贝到chapter-3/cicd/ci/api/code 下
    #将前述课程中的application.yml和copy.sh以及settings.xml拷贝到chapter-3/cicd/ci/api
    #编写 Dockerfile
    #编写集成脚本kaniko.groovy
      #主要部分一 podTemplate 作用，定义构建时的镜像与持久化目录
      #主要部分一 node
#### 创建 pipeline
    在jenkins 中创建 item
    选择pipeline,命名如:kaniko ,然后勾选This project is parameterized ： 
        添加参数 REGISTRY 默认值 <镜像仓库 ip:端口>
        以及 选项参数CDOPS ：默认为 apply 可选为 gitops
    在pipeline Definition 选择 Pipeline script from SCM
    SCM选择 Git 并输入构建仓库的地址
    在Script Path 处填客户集成脚本的相对路径如：chapter-3/cicd/ci/api/kaniko.groovy
#### 运行 pipeline和触发构建
    在 jenkins 进行构建，并查看构建日志
    选择 pipeline 进行 webhook 设置：
    在configure页面Build Triggers勾选Generic Webhook Trigger，然后在Token处输入触发 token 如:jsh-api
    访问http://<jenkins-ip:端口号>/generic-webhook-trigger/invoke?token=jsh-api 触发构建
    在 git 仓库配置对应 webhook 以实现 push 成功构建
#### 使用 gitOps 分离构建与部署
       fluxctl install \
    --git-user=pada8849 \
    --git-email=pada8849@gmail.com \
    --git-url= \
    --git-path=chapter-3/cicd/cd \
    --namespace=k8s | kubectl apply -f -
### 注意事项
##### 1.如不更新Kubernetes插件，可能出现报错
##### 2.如构建流水线持续出现Waiting for next available executor，前往http://<jenkins-ip:端口号>/computer/(built-in)/configure添加executors数量
