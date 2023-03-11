

FROM 192.168.1.88:5000/python39-build

WORKDIR /app

COPY . .

RUN ls && cp -ar site-packages/* /usr/local/lib/python3.9/site-packages && \
    cp -ar . /tmp/.cache/pip && \
    pip install --no-index --find-links=/tmp/.cache/pip -r requirements.txt



CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
