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
### 在应用上接入 prometheus 以监控 JVM 状态

# 注意事项
### 1.在配置AlertmanagerConfigs的接收者时，界面上缺少参数会导致创建不成功，需要切换为 yaml 并添加接收者名称
### 2.创建群聊机器人并获取对应 webhook url
### 3.云主机在使用 smtp 时会禁止25端口

