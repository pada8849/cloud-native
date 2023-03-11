# 操作内容
### 执行 flux 集群初始化
    #安装 flux cli
    curl -s https://fluxcd.io/install.sh | sudo bash 
    flux bootstrap git  \
    	 --url=<git 仓库地址>  \
    	 --username=<用户名> \
    	 --password=<密码> \
    	 --token-auth=true  \
    	 --path=<集群信息存储目录>
    #查看flux相关资源的状态
    flux get all -A
### 将常用基础资源实现 gitops 管理
    #创建常用资源的 helmrepo,如 dapr
    kubectl apply -f ext-sys/helm-install/dapr/dapr-repo.yaml
    #编写 helmrelease
    kubectl apply -f ext-sys/helm-install/dapr/dapr-helmrelease.yaml
    #如果要进行自定义参数，可以yaml加入相应 values
    vim ext-sys/helm-install/jenkins/jenkins-helmrelease.yaml
    #通过flux get all -A查看安装状态
### 进行持续交付pipeline的设计
    # 通过helmrelease安装 jenkins    
    kubectl apply -f ext-sys/helm-install/jenkins/jenkins-repo.yaml
    kubectl apply -f ext-sys/helm-install/jenkins/jenkins-helmrelease.yaml
    #绑定域名j.com 到 ingress 的 ip
    #访问 j.com 并进行插件升级
    #准备构建缓存
    vim app-cd/using/cache-pvc.yaml
    #对于 github token 和kubeconfig 的设置参考第三章
    #创建新 item,类型为 pipeline，使用的 pipeline scripts 为app-ci/pipelines/python.groovy
### 编写基于 dapr 的 python 应用
    #代码部分
    vim app-ci/python/main.py
    vim app-ci/python/requirements.txt
    #Dockerfile 部分
    vim app-ci/python/Dockerfile
    #准备发布和组件的 yaml
    kubectl apply -f app-cd/cd-kustomization.yaml
    kubectl apply -f app-cd/component-kustomization.yaml
    #使用 jenkins构建并完成推送，查看应用部署状并获取 nodeport 端口
    curl -X GET http://192.168.1.88:30383/
    #写入状态
    curl -X PUT  http://192.168.1.88:30383/state/b/hello+world
    #读取状态
    curl -X GET http://192.168.1.88:30383/state/b
# 注意事项
### 1. 使用外网资源时要注意是否能连接，使用私有资源时注意设置相应认证密钥
    

