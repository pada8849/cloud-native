

FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt ./
RUN pip config set global.cache-dir "/tmp/.cache/pip"
RUN --mount=type=cache,target=/tmp/.cache/pip pip install --upgrade pip && \
    --mount=type=cache,target=/tmp/.cache/pip pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
