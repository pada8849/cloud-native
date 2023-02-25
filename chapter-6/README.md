# 操作内容
### 安装 istio
    # 在rancher 集群工具里安装 istio，安装时除CNI 不选择其它都安装
    # 安装命令行工具
    curl -L https://istio.io/downloadIstio | sh -
    istioctl analyze
    istioctl x precheck
    # 如以上命令未输出异常则表示 istio 可以正常使用
### 安装示例应用并进行查看
    kubectl apply -f yaml/bookinfo.yaml
    kubectl apply -f yaml/sample-gateway.yaml
    kubectl get po #确认应用已成功运行
    # 通过 <节点 ip>:31380/productpage进行访问
    # 刷新页面显示三种 review 状态随机出现
### 配置应用的 yaml 以适配 istio
    # 开启命名空间的默认 istio 注入
    kubectl label namespace default istio-injection=enabled
    # 如有应用不需要使用则在应用上添加禁止注入注释
    kubectl annotate deployment <deployment-name> sidecar.istio.io/inject="false"
    # 修改端口命名为 istio 规范格式
### 制造流量并通过 kiali 观察
    # 通过访问 kiali 地址 <rancher 访问地址>/api/v1/namespaces/istio-system/services/http:kiali:20001/proxy/
    # 手动访问页面制造流量，查看graph 查看流量请求情况
    # 查看kiali 其它菜单了解 istio 配置
### 安装 MetalLB  
    # 在rancher apps charts 搜索 MetalLB
    # 安装到 system 空间
    # 修改node label 
    kubectl lable no <为 nginx-ingress 保留 ip 的节点名> lb=nginx
    kubectl lable no <为 metallb 保留 ip 的节点名> lb=ip
    # 修改nginx-ingress-controller ds 的节点选择为 lb=nginx
    # 配置机器ip 到metallb-config.yaml 文件
    kubectl apply -f yaml/metallb-config.yaml
    # 安装完成后验证ip 分配功能
    kubectl apply -f yaml/metallb-nginx.yaml
    kubectl get svc #确认有分配 ip
### 开启 ingress gateway   
    # 将istio-ingressgatewa修改为 LoadBalancer
    kubectl get svc -n istio-system # 确认ip
    # 通过绑定 host 或者节点 ip 访问 <节点 ip>/productpage 示例应用
### 创建自己的istio 资源  
    #确认应用已开启 istio 注入
    kubectl  apply -f yaml/jsh-vs.yaml
    # 绑定host 进行访问验证
# 注意事项
### 1.使用 metallb 接入时需要有对应的服务进行验证，故使用 nginx 的应用确认 ip 正常


