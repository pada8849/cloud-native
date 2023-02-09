FROM kinshy-docker.pkg.coding.net/south/cross/nginx:stable-alpine

WORKDIR /app
# copy jar
COPY code/dist/* /app/webs/
RUN cd webs && mkdir js && cp -af *.js *.js.gz js/ \
            &&  mkdir css && cp -af *.css *.css.gz *.less *.less.gz css/ \
            &&  mkdir img && cp -af *.svg *.png *.jpg  img/ \
            &&  mkdir doc && cp -af *.xls  doc/ \
            &&  mkdir static && cp -af *.less *.less.gz less.* static/
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

