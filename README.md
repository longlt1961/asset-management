# Asset Management Docker Setup

This repository contains a Docker setup for running all components of the Asset Management system together.

## Project Structure

The project consists of the following components:

- **Backend**: A Flask application with PostgreSQL database
- **Frontend**: A React application built with Vite
- **Collect Device**: A FastAPI application for device information collection
- **DockerBuildGenerator**: An SSH server with Docker installed

## Running the Application

### Running All Services

To run all services together:

```bash
docker-compose up -d
```

This will start all services in detached mode. You can access:
- Frontend: http://localhost
- Backend API: http://localhost:5000
- Device Info API: http://localhost:8000
- SSH Server: ssh admin@localhost -p 2222 (password: admin123)

### Running Individual Services

If you want to run only specific services, you can specify them in the docker-compose command:

```bash
# Run only the backend and database
docker-compose up -d backend db

# Run only the frontend
docker-compose up -d frontend

# Run only the device info API
docker-compose up -d device-info-api
```

### Stopping Services

To stop all services:

```bash
docker-compose down
```

To stop all services and remove volumes:

```bash
docker-compose down -v
```

## Adding New Services

To add a new service to the Docker setup:

1. Create a new directory for your service
2. Create a Dockerfile for your service (use Dockerfile.template as a reference)
3. Add your service to the main docker-compose.yml file

Example of adding a new service to docker-compose.yml:

```yaml
services:
  # Existing services...
  
  # New service
  my-new-service:
    build:
      context: ./my-new-service
    container_name: my_new_service
    ports:
      - "8888:8888"
    networks:
      - asset_management_network
```

## Common Docker Commands

### Building Images

```bash
# Build all images
docker-compose build

# Build a specific service
docker-compose build frontend
```

### Viewing Logs

```bash
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs backend

# Follow logs
docker-compose logs -f
```

### Executing Commands in Containers

```bash
# Execute a command in a running container
docker-compose exec backend bash

# Run a one-off command
docker-compose run --rm backend flask db upgrade
```

### Checking Container Status

```bash
# List running containers
docker-compose ps
```

## Development Workflow

For development, you can mount your local code into the containers to see changes in real-time:

1. For the frontend, the changes will be automatically reflected when you modify the code
2. For the backend, you may need to restart the service to see changes

Example of mounting local code (already configured in docker-compose.yml):

```yaml
volumes:
  - ./collect_device:/app  # Mounts local code into the container
```

## Troubleshooting

If you encounter issues:

1. Check the logs: `docker-compose logs service-name`
2. Ensure all required ports are available
3. Try rebuilding the images: `docker-compose build`
4. Restart the services: `docker-compose restart`
