# 操作内容
### k8s 运行 influxdb和k6
    # 从docker-compose 中分析需要的应用为k6 influxdb 和 grafana
    # 搜索 helm influxdb 
    git clone https://github.com/influxdata/helm-charts.git
    # 也可以在 rancher 应用的 仓库里添加https://github.com/influxdata/helm-charts.git 不过要注意网络
    # 修改 influxdb 的 value.yaml添加 env 如有镜像下载问题则修改镜像
    cd helm-charts/charts/influxdb && vim value.yaml
    env: 
      - name: INFLUXDB_DB
        value: "k6"
    #通过 helm install influxdb .安装influxdb
    #安装 k6
    kubectl apply -f chapter-5/yaml/k6.yaml #注意修改hostAliases ip以绑定 hosts
    #拷贝脚本到 pod 中
    kubectl cp chapter-4/k6-compose/k6scripts/script.js $(kubectl get pods -l io.kompose.service=k6 | awk 'NR==2{print $1}'):/tmp/script.js
    kubectl exec -it $(kubectl get pods -l io.kompose.service=k6 | awk 'NR==2{print $1}') -- k6 run /tmp/script.js
    # 查看是否能正常进行压测提示
### 安装 rancher monitoring 并配置influxdb 数据源
    #在rancher 中打开集群工具，安装 Monitoring
    #安装时如需要保存持久化数据则开启 prometeus pvc
    #在 Alerting 里启用Alertmanager
    #如需要 保存 grafana 设置则开启 grafana pvc
    #安装完成后访问 grafana地址查看集群监控
    https://<rancher 地址>/api/v1/namespaces/cattle-monitoring-system/services/http:rancher-monitoring-grafana:80/proxy/?orgId=1
    # 点击sign in 使用admin prom-operator 完成登录
    # 在设置 data sources 点击 add data source 搜索 influxdb 点击
    # 在 URL 处填上influxdb svc 地址http://influxdb.default:8086 在database 处填上 k6 然后save & test 确认添加数据源成功
    # 点击create 菜单下的 import 输入id 10660并 load,点击 import,即可打开 load testing 面板
    # 访问面板查看 k6测试结果数据
###  添加邮件告警接收者
    # 访问rancher 在监控菜单下找到告警，告警设置选择创建创建一个告警设置 AlertmanagerConfigs 名为 default
    # 准备一个可以进行 smtp 发送邮件的邮箱
    # 在 secrets 里创建Opaque 类型的邮箱密码
    # 打开 default的AlertmanagerConfigs，添加 receiver 选择为邮箱
    # 填写接收者邮箱 发送者相关信息
    # 打开rancher 在监控菜单下prometheus graph ，找到正在告警的内容
    # 编辑default的AlertmanagerConfigs，在 route 上配置接收者和匹配规则如 serverity=warning
    # 登录邮箱验证是否收到邮件
### 使用 webhook向企业微信机器人发送信息
    #构建镜像
     cd chapter-5/webhook
     DOCKER_BUILDKIT=1 dh build -t <镜像仓库>/library/webhook-wework:home .
     docker push <镜像仓库>/library/webhook-wework:home 
     cd ../yaml
     vim webhook.yaml
    # 替换镜像仓库地址和 webhook url
     kubectl apply -f webhook.yaml
    # 添加 webhook 接收者并确认有告警发出
    # 查看alertmanager-rancher-monitoring-alertmanager pod 的日志
    #查看 webhook pod 的日志
    #确认企业微信机器人能收到信息
### 设置应用的 prometheus rule及告警
    #打开 rancher 的监控菜单下的Advanced下的 PrometheusRule
    #选择对应的命名空间，填写规则名，组名，添加告警，添加告警名称，可填写以下 PromQL 表达式
    sum by(namespace, pod) (max by(namespace, pod) (kube_pod_status_phase{job="kube-state-metrics",namespace="default",phase=~"Pending|Unknown"})
            * on(namespace, pod) group_left(owner_kind) topk by(namespace, pod) (1, max
            by(namespace, pod, owner_kind) (kube_pod_owner{owner_kind!="Job"}))) > 0
    # 注意如要正常通过 webhook 发送告警，要填写注释内容，添加后内容如yaml/prometheusrule.yaml所示
    # 添加完成后可在 Prometheus Alerts 面板中看到添加的规则
    # 添加AlertmanagerConfigs，步骤如上一章中的步骤操作即可
    # 手动制造对应故障，如设置高 HPA 最小值但设置节点反亲和，导致部分 pod 一直处于 pending 状态
    # 确认查收到告警通知以及故障解决
### 使用chaos mesh注入故障以帮助验证
    #安装 chaos mesh
    curl -sSL https://mirrors.chaos-mesh.org/v2.5.1/install.sh | bash
    kubectl get svc -n chaos-mesh #获取 nodeport 端口号
    #访问 <ip:以上端口号> 进行混沌试验
### 在应用上接入 prometheus 以监控 JVM 状态
    # 准备pom.xml 及 application.yml配置
    vim pom.xml #加入以下内容
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-actuator</artifactId>
            </dependency>
            <dependency>
                <groupId>io.micrometer</groupId>
                <artifactId>micrometer-registry-prometheus</artifactId>
            </dependency>
    vim application.yml #加入以下内容
            management:
              endpoints:
                web:
                  exposure:
                    include: prometheus  # 打开 Prometheus 的 Web 访问 Path
              metrics:
                # 下面选项建议打开，以监控 http 请求的 P99/P95 等，具体的时间分布可以根据实际情况设置
                distribution:
                  sla:
                    http:
                      server:
                        requests: 1ms,5ms,10ms,50ms,100ms,200ms,500ms,1s,5s
                # 在 Prometheus 中添加特别的 Labels
                tags:
                  # 必须加上对应的应用名，因为需要以应用的维度来查看对应的监控
                  application: jsh-api
    #在构建的 groovy 脚本中加入cp -af pom.xml code/pom.xml
    # 执行构建和部署，完成后访问<应用 url>/actuator/prometheus验证
    # 配置ServiceMonitor,参考 yaml/servicemonitor.yaml
    # 在grafana 里导入 id 为12856 的面板查看验证
### 使用 kubecost 查看资源情况适配 Finops
    # 在 rancher 应用中安装 kubecost
    # 安装完成后配置 ingress 域名进行访问
### 安装开启 logging
     # 在 rancher 集群工具中安装 logging
     # 安装es 
     # 配置Cluster out
     # 配置flow
# 注意事项
### 1.在配置AlertmanagerConfigs的接收者时，界面上缺少参数会导致创建不成功，需要切换为 yaml 并添加接收者名称
### 2.创建群聊机器人并获取对应 webhook url
### 3.云主机在使用 smtp 时会禁止25端口

