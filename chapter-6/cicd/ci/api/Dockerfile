FROM kili-docker.pkg.coding.net/ebes/ot/openjdk:8-jre-alpine
ENV JAVA_OPTS="-Xms128m -Xmx256m"
ENV ACTIVE="dev"
ENV JARNAME="jshERP.jar"

WORKDIR /app
# copy jar
COPY $JARNAME /app/
#使用 shell 处理
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar -Duser.timezone=GMT+8 /app/$JARNAME --spring.profiles.active=$ACTIVE "]
