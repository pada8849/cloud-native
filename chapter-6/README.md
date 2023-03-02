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
### 创建示例应用的多版本
    # 如有使用jenkins持续集成，可以在chapter-3/cicd/cd 中的 manifest.yaml 上加上 label version: v1 标签，将端口名修改为 http
    # 如果直接使用 yaml 进行部署如 helm chart 则修改 yaml 上的对应文件
    # 如果变更了标签，在 执行 kubectl apply -f 前执行kubectl delete -f 删除原有 svc 和 deploy
    # 参考本节yaml中的 v2-deploy 部署 web 和 api 的 v2版本
    # 创建完成后通过 kiali 验证application 同时有 v1和v2标签
    # 通过访问 jsh-web 进行验证，需要在 ingress 上绑定子目录，在 ingress yaml 上添加
              - backend:
                  service:
                    name: jsh-api
                    port:
                      number: 9999
                path: /jshERP-boot
                pathType: Prefix
    # 完成页面访问并验证流量正常在 kiali 中展示 Graph
### 指定路由请求
    # 让所有访问jsh-web的请求只转发到 v1
    kubectl apply -f yaml/dr.yaml #创建请求目标
    kubectl apply -f yaml/jsh-vs-web-v1.yaml #创建路由规则仅发往 v1
    # 访问页面，查看 kiali 确认只有 v1收到请求
    kubectl logs -f -l app=jsh-web,version=v1
    kubectl logs -f -l app=jsh-web,version=v2
    for i in {1..100}; do  curl  http://cia.com ; done
    # 让header 头中包含 virtual-user 且前缀匹配 j 的导向到不同版本，header 键匹配方式 exact, prefix,regex
    kubectl apply -f yaml/jsh-vs-web-user-v2.yaml
    curl -H "virtual-user: jason"  http://cia.com
    # 基于登录成功的用户发送不同的请求,用户登录成功请求到 v2
    kubectl logs -f -l app=jsh-api,version=v1
    kubectl logs -f -l app=jsh-api,version=v2
    kubectl apply -f yaml/jsh-vs-api-login-v2.yaml
    for i in {1..100}; do  curl  http://cia.com/jshERP-boot/platformConfig/getPlatform/name ; done
    for i in {1..100}; do  curl  -H "X-Access-Token: fed3f97a1a604a35af9183f9dbcfd289_63" http://cia.com/jshERP-boot/materialCategory/getMaterialCategoryTree?id=  ; done
    # 流量转移
    kubectl apply -f yaml/jsh-vs-api-login-v2.yaml 
    for i in {1..100}; do  curl  http://cia.com ; done
    # 观察日志流量情况，然后修改比率值,weight总计值需要等于100
### 故障注入
    kubectl apply -f yaml/jsh-vs-web-user-fault.yaml
    for i in {1..100}; do  curl -H "virtual-user: jj"  http://cia.com ; done
    for i in {1..100}; do  curl -H "virtual-user: aa"  http://cia.com ; done
    #观察日志看是否是50%的延迟1秒和80%的500错误
### 请求超时
    # 因为涉及应用间调用，单应用无法体现，使用 sample 应用
     kubectl apply -f yaml/sample-dr.yaml
     kubectl apply -f yaml/sample-timeout.yaml
     # 访问 productpage 页面，会显示评论不可用
     # 在kiali 修改ratings延迟为0.2s,再次访问会显示可用
### 请求熔断
    kubectl apply -f yaml/jsh-breaking.yaml
    kubectl apply -f yaml/sample-fortio.yaml
    kubectl exec $(kubectl get pods -l app=fortio | awk 'NR==2{print $1}') -c fortio -- /usr/bin/fortio curl -quiet http://jsh-api:9999/jshERP-boot/platformConfig/getPlatform/name
    kubectl exec $(kubectl get pods -l app=fortio | awk 'NR==2{print $1}') -c fortio -- /usr/bin/fortio load -c 2 -qps 0 -n 20 -loglevel Warning http://jsh-api:9999/jshERP-boot/platformConfig/getPlatform/name
    kubectl exec $(kubectl get pods -l app=fortio | awk 'NR==2{print $1}') -c fortio -- /usr/bin/fortio load -c 3 -qps 0 -n 20 -loglevel Warning http://jsh-api:9999/jshERP-boot/platformConfig/getPlatform/name
    # 可以观察到不同流量下的返回503的比率变化
### 流量镜像
    kubectl apply -f yaml/jsh-vs-web-v1-mirror.yaml
    for i in {1..100}; do  curl  http://cia.com ; done
### 配置 TLS 证书
    # 创建一个 TLS secret 命名为 istio-ingressgateway-certs, 参考第四章 TLS 证书部分
    #创建 gateway
     kubectl apply -f yaml/jsh-ssl-gateway.yaml
     kubectl apply -f yaml/jsh-ssl-vs.yaml
### 配置 ServiceEntry
    #  修改出网模式
    kubectl edit configmap istio -n istio-system
    #在mesh 下加入以下内容表示对出网流量必须注册,默认值为 ALLOW_ANY
    outboundTrafficPolicy: 
        mode: REGISTRY_ONLY 
    kubectl exec $(kubectl get pods -l app=jsh-web | awk 'NR==2{print $1}')   -- curl httpbin.org/headers
    #此时不会收到结果
    kubectl apply -f yaml/sample-serviceentry.yaml
    # 再次执行上续命令时即可看到请求结果
### 验证 Egressgateway和 vs
    # 安装时启用Egressgateway
    kubectl apply -f yaml/sample-egressgateway.yaml
    kubectl apply -f yaml/sample-serviceentry-timeout.yaml
    kubectl exec $(kubectl get pods -l app=jsh-web,version=v1 | awk 'NR==2{print $1}')   --  curl httpbin.org/delay/5
    # 设置在3秒超时，此时返回连接超时，如果把 delay 降低到3s 以内，则正常返回
    # 指定流量出口
    kubectl apply -f yaml/telemetry.yaml # 开启Envoy 日志
    kubectl apply -f yaml/sample-egress-dr.yaml # 创建目标对象规则
    kubectl apply -f yaml/sample-egress-vs.yaml # 创建流量转发规则
    kubectl logs -f -l app=jsh-web,version=v1 -c istio-proxy #查看流量请求 pod 日志
    kubectl logs -l istio=egressgateway -c istio-proxy -n istio-system # 查看egressgateway 日志
    kubectl exec $(kubectl get pods -l app=jsh-web,version=v1 | awk 'NR==2{print $1}')   --  curl httpbin.org/delay/0
# 注意事项
### 1.使用 metallb 接入时需要有对应的服务进行验证，故使用 nginx 的应用确认 ip 正常
### 2.如有upstream connect error or.....SSL routines:OPENSSL_internal:SSLV3_ALERT_CERTIFICATE_EXPIRED 删除istiod 和 ingressgateway pod
   


