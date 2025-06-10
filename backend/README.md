# User Management Application with Flask and PostgreSQL on Docker

This application provides a simple API for managing users, utilizing the Flask framework, SQLAlchemy ORM, and a PostgreSQL database. Everything is containerized using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## How to Run


1. Start the Docker containers:

   docker-compose up -d --build

2. The application will be running at http://localhost:5000. The PostgreSQL database will be accessible at localhost:5432.


API Endpoints
POST /users: Create a new user.

Request body (JSON): { "username": "...", "email": "...", "password": "..." }

Response (JSON): { "message": "...", "user": { ... } }

GET /users: Get a list of all users.

Response (JSON): [ { ... }, { ... } ]

GET /users/<int:user_id>: Get information for a specific user by ID.

Response (JSON): { ... }

PUT /users/<int:user_id>: Update information for a specific user by ID.

Request body (JSON): { "username": "...", "email": "...", "password": "..." } (optional fields)

Response (JSON): { "message": "...", "user": { ... } }

DELETE /users/<int:user_id>: Delete a specific user by ID.

Response (JSON): { "message": "..." }

Explanation

app/: Contains the Flask application source code.

__init__.py: Initializes the Flask application and configures SQLAlchemy.

models.py: Defines the User model, which corresponds to the database table.

routes.py: Defines the API endpoints for managing users.

utils.py: Contains utility functions, such as validate_email.

docker-compose.yml: Defines the Docker services (web application and PostgreSQL database) and how they interact.

Dockerfile: Defines the Docker environment for the Flask application.

requirements.txt: Lists the necessary Python libraries.

README.md: Provides usage instructions.

Customization

You can modify the database connection details in docker-compose.yml and app/__init__.py.
Extend the User model in app/models.py to include additional user information fields.
Add new API endpoints or customize the existing logic in app/routes.py.