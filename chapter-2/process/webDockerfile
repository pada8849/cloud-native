FROM kinshy-docker.pkg.coding.net/south/cross/node:lts-buster AS builder
WORKDIR /app

COPY ./code ./code
RUN  cd code && \
     npm install
RUN  cd code && npm run build:prod



FROM kinshy-docker.pkg.coding.net/south/cross/nginx:stable-alpine

WORKDIR /app
# copy jar
COPY --from=builder /app/code/dist/* /app/webs/

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

