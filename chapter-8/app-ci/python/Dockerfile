

FROM 192.168.1.88:5000/python39-build

WORKDIR /app

COPY . .

RUN ls && cp -ar pip/site-packages/* /usr/local/lib/python3.9/site-packages && \
    cp -ar ./pip/* /tmp/.cache/pip && \
    pip install  -r requirements.txt



CMD ["python3","-m","uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
