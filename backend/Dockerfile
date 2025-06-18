FROM python:3.9-slim-buster

ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_EXPORTER_VERSION=1.8.1

# Install required tools
RUN apt-get update && \
    apt-get install -y wget supervisor && \
    apt-get clean

# Install Node Exporter
RUN wget https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz && \
    tar -xzf node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz && \
    mv node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64/node_exporter /usr/local/bin/ && \
    rm -rf node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64*

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY app .

ENV FLASK_APP=__init__.py

# Copy supervisord config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 5000 9100

# Start Flask + Node Exporter together
CMD ["/usr/bin/supervisord"]