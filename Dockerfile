FROM python:3.8-slim-buster
WORKDIR /redis-service

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8083

CMD ["gunicorn", "--workers", "2", "--bind", "0.0.0.0:8083", "app:app"]