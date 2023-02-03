# 基础镜像
FROM redis
# author
MAINTAINER jsh

# 挂载目录
VOLUME /home/jsh/redis
# 创建目录
RUN mkdir -p /home/jsh/redis
# 指定路径
WORKDIR /home/jsh/redis
# 复制conf文件到路径
COPY ./conf/redis.conf /home/jsh/redis/redis.conf
