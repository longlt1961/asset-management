FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app .

ENV FLASK_APP=__init__.py

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]