# 操作内容
### 节点操作
    # 从集群中移除和重置节点
    #在主节点进行驱逐对象节点上的 pod
    kubectl drain <节点名> #等待完成,如使用 longhorn 作为分布式存储会驱逐对应存储到其它节点
    kubectl delete no <节点名>
    #在从节点上执行 rke2卸载
    
### pod 反亲和
    在部署deploy yaml 的spec.template.spec 添加
          affinity:
            podAntiAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                - labelSelector:
                    matchExpressions:
                      - key: io.kompose.service #对应应用的 labels key
                        operator: In
                        values:
                          - jsh-api  #对应应用的 labels value
                  topologyKey: "kubernetes.io/hostname"
### 资源限制开启
    在部署deploy yaml 的spec.template.spec.containers.<容器名> 添加  
        resources:
          limits:   #限制值
            cpu: 200m
            memory: 500Mi
          requests:  #请求值
            cpu: 100m
            memory: 200Mi
    注意开启探针以适配启动过程，与以上相同位置添加
        livenessProbe:
          tcpSocket:
            port: 9999
          initialDelaySeconds: 120
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3
        readinessProbe:
          tcpSocket:
            port: 9999
          initialDelaySeconds: 120
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3
### LimitRange 和 HPA
    #可查看示例中chapter-4中的 yaml/limitrange.yaml #不建议在充分了解应用场景时打开，会影响 pod 创建
    #通过 rancher在命名空间设置资源限制
    #命令行创建 hpa
    kubectl autoscale deployment jsh-api --cpu-percent=80 --min=1 --max=10
    #或者使用示例 yaml 亦可以在 rancher 中直接添加
    kubectl get hpa #可进行查看
    
### ingress 配置和 ssl 证书
    #申请 ssl 证书并下载 可在云厂商申请单域名ssl 证书或者使用letsencrypt的免费通配证书
    kubectl create secret tls tls-secret --key tls.key --cert tls.crt  #key 是私钥以-----BEGIN PRIVATE KEY-----开头  crt 是证书 以-----BEGIN CERTIFICATE----- 开头
    #也可以在 rancher 创建 tls 类型 secret
    #创建ingress 可修改示例中 ingress
    kubectl get ing
    #绑定 host 验证访问ssl 是否生效
### 应用回滚和 helm 回滚
    #查看可用版本
    kubectl rollout history deployment/jsh-api
    #回滚指定版本 不指定时回滚上一版本
    kubectl rollout undo deployment/jsh-api --to-revision=<revision-number>
    #查看回滚状态
    kubectl rollout status deployment/jsh-api 
    # helm 回滚操作
    helm list #获取安装的 helm chart
    helm history <release-name> #查看应用的版本记录
    helm rollback <release-name> <revision-number> #回滚指定应用指定版本
    helm status <release-name> #查看状态
### 使用 k6验证 hpa 及接口
    #安装 k6
    wget https://github.com/grafana/k6/releases/download/v0.42.0/k6-v0.42.0-linux-amd64.tar.gz
    tar -xzf  k6-v0.42.0-linux-amd64.tar.gz
    mv k6-v0.42.0-linux-amd64/k6 /usr/local/bin/
    k6 version
    #开启观测容器
    watch kubectl get hpa
    watch kubectl get po
    watch kubectl top po
    watch kubectl top no
    kubectl logs -f $(kubectl get pods -l io.kompose.service=jsh-api | awk 'NR==2{print $1}')
    k6 run api.js #示例请求在 chapter-4/k6script 目录
### 使用 docker-compose 运行k6并保存负载测试记录
    cd chapter-4/k6-compose
    docker-compose up -d influxdb 
    docker-compose run -v $PWD/samples:/scripts k6 run /scripts/script.js
    通过<ip:3000>查看 grafana 并添加面板输入 ip 10660进行 load 并选择数据源保存
    
# 注意事项
### 1.资源限制与探针的相互影响，如果资源限制较小，则容器启动时长会越长，因此需要多次调整以验证合理的值
### 2.如何批量获取接口实现请求
##### A.浏览器抓包法
    在 chrome 浏览器进行操作并查看网络请求，以 har 的格式导出所有请求
    使用grafana/har-to-k6:latest镜像
    docker run --rm -v ${PWD}:/local kili-docker.pkg.coding.net/ebes/ot/grafana/har-to-k6:latest   /local/api.har -o /local/k6-har.js
    下载 k6-har.js 并移除不需要的内容
    添加认证过程及请求时间
##### B.swagger 生成法
    获取接口的 swagger json 文件
    使用openapitools/openapi-generator-cli镜像
    docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
        -i /local/spec.json \
        -g k6 \
        -o /local/k6-test/
    添加认证过程及请求时间
