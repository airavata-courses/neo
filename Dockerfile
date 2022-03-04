FROM python:3.8-slim-buster
WORKDIR /gateway

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8081

CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8081", "app:app"]
