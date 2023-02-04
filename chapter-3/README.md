#操作步骤
### 安装 rke2集群和相关工具
####  1.执行机器优化
###### 更新系统：
    sudo apt-get update && sudo apt-get upgrade -y
###### 设置内核参数：
    sudo sysctl -w net.ipv4.tcp_tw_recycle=1 
    sudo sysctl -w net.ipv4.tcp_tw_reuse=1
    sudo sysctl -w net.ipv4.tcp_fin_timeout=30
    sudo sysctl -w net.ipv4.ip_local_port_range="1024 65535"
    sudo sysctl -w net.core.somaxconn=65535
    sudo sysctl -w net.core.rmem_default=268435456
    sudo sysctl -w net.core.rmem_max=268435456
    sudo sysctl -w net.core.wmem_default=268435456
    sudo sysctl -w net.core.wmem_max=268435456
###### 设置 cgroup 限制：
    sudo echo "cgroup_enable=memory swapaccount=1" >> /etc/default/grub
sudo update-grub
###### 设置 swappiness 值：
    sudo sysctl -w vm.swappiness=10
###### 禁用掉 THP（Transparent Huge Pages）：
    sudo echo never > /sys/kernel/mm/transparent_hugepage/enabled
    sudo echo never > /sys/kernel/mm/transparent_hugepage/defrag
###### 设置最大打开文件数：
    sudo echo "* soft nofile 1048576" >> /etc/security/limits.conf  
    sudo echo "* hard nofile 1048576" >> /etc/security/limits.conf
    sudo echo "root soft nofile 1048576" >> /etc/security/limits.conf
    sudo echo "root hard nofile 1048576" >> /etc/security/limits.conf
###### 设置网络参数：
    sudo echo "net.core.netdev_max_backlog=250000" >> /etc/sysctl.conf  
    sudo echo "net.ipv4.tcp_max_syn_backlog=80000" >> /etc/sysctl.conf  
    sudo echo "net.ipv4.tcp_mem=786432 1048576 1572864" >> /etc/sysctl.conf
    sudo echo "net.ipv4.tcp_rmem=1024 4096 87380" >> /etc/sysctl.conf
    sudo echo "net.ipv4.tcp_wmem=1024 4096 87380" >> /etc/sysctl.conf
    sudo echo "net.ipv4.tcp_slow_start_after_idle=0" >> /etc/sysctl.conf
    sudo echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
    sudo echo "net.ipv4.ip_local_port_range=10240 65535" >> /etc/sysctl.conf
###### 关闭 Swap 安装ntp 并重启
    swapoff -a
    vim /etc/fstab   && 使用 # 注释掉有 swap 的一行
    apt install ntp    -y
    systemctl enable ntp 
     reboot
####  2.安装 rke2
###### 下载安装基础镜像
    curl -fL "https://kili-generic.pkg.coding.net/ebes/public-resource/rke2.linux-amd64.tar.gz?version=latest" -o rke2.linux-amd64.tar.gz
    curl -fL "https://kili-generic.pkg.coding.net/ebes/public-resource/rke2-images.linux-amd64.tar.zst?version=latest" -o rke2-images.linux-amd64.tar.zst
    curl -fL "https://kili-generic.pkg.coding.net/ebes/public-resource/sha256sum-amd64.txt?version=latest" -o sha256sum-amd64.txt
    curl -fL "https://kili-generic.pkg.coding.net/ebes/public-resource/install.sh?version=latest" -o install.sh
    INSTALL_RKE2_ARTIFACT_PATH=/root/rke2-artifacts sh install.sh #主节点和 node 节点都执行
###### 主节点上启动rke2-server
    systemctl enable rke2-server.service && systemctl start rke2-server.service
######  从节点上启动 rke2-agent
`待rke2-server启动完成后在主节点执行获取 token`

    cat /var/lib/rancher/rke2/server/node-token
`在从节点执行`

    mkdir -p /etc/rancher/rke2/ 
    vim /etc/rancher/rke2/config.yaml 
    server: https://<主节点 ip>:9345
    token: <以上 token>
    systemctl enable rke2-agent.service && systemctl start rke2-agent.service
####  安装kubectl并配置 kubeconfig
    curl -LO https://dl.k8s.io/release/v1.26.1/bin/linux/amd64/kubectl
    chmod +x kubectl
    sudo mv kubectl /usr/local/bin/
    source <(kubectl completion bash)
    mkdir ~/.kube && cp -af /etc/rancher/rke2/rke2.yaml .kube/config
    kubectl get po 验证 
####  安装helm
    curl https://get.helm.sh/helm-v3.4.2-linux-amd64.tar.gz -o helm-v3.4.2-linux-amd64.tar.gz
    tar -zxvf helm-v3.4.2-linux-amd64.tar.gz
    sudo mv linux-amd64/helm /usr/local/bin/
####  安装rancher
    helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
    kubectl create namespace cattle-system
    helm install rancher  rancher-latest/rancher   --namespace cattle-system   --set hostname=[rancher.test.com]  --set ingress.tls.source=secret   --set bootstrapPassword=[test123456]  --set replicas=1  --set rancherImage=kili-docker.pkg.coding.net/ebes/ot/rancher/rancher
####  安装longhorn
    sudo apt-get install open-iscsi nfs-common -y
`然后在 rancher 界面--集群工具中安装 longhorn`
##### 
### 转换并构建推送镜像
##### 确认要使用的目标镜像仓库（云端或者私有）示例以 
`docker run -d -p 5000:5000 --restart=always --name registry registry:2` 为镜像仓库
##### 修改chapter-2/compose的 docker-compose.yml 批量将 image: 替换为 image: [镜像仓库机器ip]:5000/jsh/
##### 执行 docker-compose build 构建目标镜像
##### 批量推送 
`nohup docker images | grep "5000/jsh" |awk '{print "docker push"" "$1":"$2}'  |sh > push.log &`
<br></br>
### 安装 kompose并转换 k8s部署yaml
##### 安装kompose
`curl -L https://github.com/kubernetes/kompose/releases/download/v1.21.0/kompose-linux-amd64 -o kompose
&& chmod +x kompose
&& mv ./kompose /usr/local/bin/kompose`
##### 将 docker-compose.yml 复制到 chapter-3/k8s/kompose
##### 对docker-compose.yml 进行部分修改，主要目的减少 pvc 的数量，参考版本中的文件
##### 执行 kompose convert
##### 修改生成的 pvc 文件中容量大小 如redis 10Gi mysql 20Gi
##### 修改生成的 jsh-web-service.yaml 文件的 spec 下添加 type: NodePort
##### 执行kubectl apply -f . 按注意事项2中的方式处理 mysql 报错问题
##### 通过 kubectl get svc 查看jsh-web 的NodePort 端口并进行访问验证
##### 如需要删除执行 kubectl delete -f .
### 转换为 helm chart
##### 在以上 kompose 目录执行 kompose convert -c 生成 chart
##### 参照上步中修改 pvc 容量和 svc 类型
##### 创建新命名空间 kubectl create ns jsh
##### 执行 helm install -n jsh jsh . 按注意事项2中的方式处理 mysql 报错问题
##### 通过 kubectl get svc -n jsh 查看jsh-web 的NodePort 端口并进行访问验证
##### 如需要删除执行 helm uninstall -n jsh jsh
## 操作注意
##### 1.kompose 需要docker-compose.yml版本号为整数
##### 2. mysql 启动时挂载卷内如有文件会报错 --initialize specified but the data directory has files in it 
###### 此时可修改 mysql 容器的启动命令为 tail -f /dev/null 
###### 然后通过 kubectl exec -it [mysql-po] bash 方式操作删除/var/lib/mysql 下的文件夹，
###### 再将命令修改回 mysql启动命令 
`mysqld --innodb-buffer-pool-size=80M --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-time-zone=+8:00 --lower-case-table-names=1` 

