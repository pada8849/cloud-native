# 基于K8S 持续交付操作步骤
### 安装 jenkins
    helm repo add jenkins https://charts.jenkins.io
    helm repo update
    kubectl create ns ci
    helm install jenkins jenkins/jenkins -nci
    kubectl edit svc -nci jenkins #将 type 改为 NodePort
    kubectl get svc -nci #获取 jenkins nodeport 端口号
    kubectl get secret -nci jenkins -o yaml | grep jenkins-admin-password: | awk '{print $2}' | base64 --decode
    或者kubectl get secret -n ci jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 -D
    通过http://<节点 ip:以上端口号>/manage/pluginManager/updates/ 访问插件更新中心，使用上一步获取的密码，更新对应插件
### 安装 flux
    curl -s https://fluxcd.io/install.sh | sudo bash 
