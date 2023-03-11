

FROM 192.168.1.88:5000/python39-build

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-index --find-links=/tmp/.cache/pip -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
