FROM kili-docker.pkg.coding.net/ebes/ot/python:3.10.2
ENV URL="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key="
COPY ./app /app
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN --mount=type=cache,target=/root/.cache/pip,rw pip install -r /app/requirements.txt
CMD ["python", "/app/main.py","-p 5000", "-k","$URL"]
