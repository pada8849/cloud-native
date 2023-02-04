#操作步骤
### 安装 rke2集群和相关工具
##### 
### 转换并构建推送镜像
##### 确认要使用的目标镜像仓库（云端或者私有）示例以 docker run -d -p 5000:5000 --restart=always --name registry registry:2 为镜像仓库
##### 修改chapter-2/compose的 docker-compose.yml 批量将 image: 替换为 image: [镜像仓库机器ip]:5000/jsh/
##### 执行 docker-compose build 构建目标镜像
##### 批量推送 nohup docker images | grep "5000/jsh" |awk '{print "docker push"" "$1":"$2}'  |sh > push.log &
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

