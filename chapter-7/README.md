# 操作内容
### 使用postStart和 Init 容器
    #init 初始化执行 mysql
    #编写执行 shell
    #编写 Dockerfile
    #加入到部署 yaml
    #poststart 创建目录拷贝文件
    #prestop 结束前触发
### 使用blackbox 进行应用健康监测告警
    #安装 blackbox
    kubectl apply -f yaml/blackbox.yaml
    #配置服务发现
    kubectl apply -f yaml/api-servicemonitor.yaml   
    #配置告警规则
    kubectl apply -f yaml/promrule.yaml
    #配置告警通道   
    kubectl apply -f yaml/alertconfig.yaml 
    #验证，查看图表在 grafana 导入14928 面板
    #关闭服务，验证告警通知
### networkpolicy 规则
    #ingress规则
    kubectl apply -f yaml/networkpolicyingress.yaml
    kubectl run busybox --rm -ti --image=busybox:1.28 -- /bin/sh
    kubectl run label-busybox --rm -ti --labels="access=true" --image=busybox:1.28 -- /bin/sh
    wget --spider --timeout=1 jsh-web #查看不同结果
    
### dapr 具体操作
    #添加 dapr helm 
    #添加deploy yaml 的 dapr 注入 
    #设置 componet
    #操作状态验证
