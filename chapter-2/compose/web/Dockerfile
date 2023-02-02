ARG BUILDKIT=1
FROM kinshy-docker.pkg.coding.net/south/cross/node:lts-buster AS builder
WORKDIR /app

COPY ./code ./code

WORKDIR /app/code
RUN --mount=type=cache,target=/root/.yarn,id=yarn-cache,sharing=locked \
     YARN_CACHE_FOLDER=/root/.yarn yarn install

RUN  yarn build


FROM kinshy-docker.pkg.coding.net/south/cross/nginx:stable-alpine

WORKDIR /app
# copy jar
COPY --from=builder /app/code/dist/* /app/webs/
RUN cd webs && mkdir js && cp -af *.js *.js.gz js/ \
            &&  mkdir css && cp -af *.css *.css.gz *.less *.less.gz css/ \
            &&  mkdir img && cp -af *.svg *.png *.jpg  img/ \
            &&  mkdir doc && cp -af *.xls  doc/ \
            &&  mkdir static && cp -af *.less *.less.gz less.* static/
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

