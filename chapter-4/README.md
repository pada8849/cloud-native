#操作内容
###节点操作
    # 从集群中移除和重置节点
    #在主节点进行驱逐对象节点上的 pod
    kubectl drain <节点名> #等待完成,如使用 longhorn 作为分布式存储会驱逐对应存储到其它节点
    kubectl delete no <节点名>
    #在从节点上执行 rke2卸载
    
###pod 反亲和
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
###资源限制开启
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
###LimitRange 和 HPA
    #可查看示例中chapter-4中的 yaml/limitrange.yaml
    
###ingress 配置和 ssl 证书
    #申请 ssl 证书并下载
###应用回滚 helm 回滚
