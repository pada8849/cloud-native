ARG BUILDKIT=1
FROM kinshy-docker.pkg.coding.net/south/cross/maven:3.6-jdk-8-alpine AS builder
WORKDIR /app
RUN mkdir jar
COPY ./code ./code
WORKDIR /app/code
RUN --mount=type=cache,target=/root/.m2,rw  mvn clean
RUN --mount=type=cache,target=/root/.m2,rw  mvn -e -B package
WORKDIR /app
COPY copy.sh .
RUN chmod +x copy.sh && ./copy.sh

FROM openjdk:8-jre-alpine
ENV JAVA_OPTS="-Xms128m -Xmx256m"
ENV ACTIVE="dev"
ENV JARNAME="jshERP.jar"

WORKDIR /app
# copy jar
COPY --from=builder /app/jar/*.jar /app/
#使用 shell 处理
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar -Duser.timezone=GMT+8 /app/$JARNAME --spring.profiles.active=$ACTIVE "]
