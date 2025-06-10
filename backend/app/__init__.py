from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import time
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://user:password@db:5432/mydatabase')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Import models before creating tables
from app import models

# Wait for the database to be ready
def wait_for_db(max_retries=30, retry_interval=2):
    retries = 0
    db_uri = app.config['SQLALCHEMY_DATABASE_URI']
    
    # Extract connection parameters from the URI
    # Format: postgresql://user:password@host:port/dbname
    db_parts = db_uri.split('://', 1)[1].split('@')
    user_pass = db_parts[0].split(':')
    host_port_db = db_parts[1].split('/')
    
    user = user_pass[0]
    password = user_pass[1]
    host_port = host_port_db[0].split(':')
    host = host_port[0]
    port = int(host_port[1]) if len(host_port) > 1 else 5432
    dbname = host_port_db[1]
    
    while retries < max_retries:
        try:
            conn = psycopg2.connect(
                dbname=dbname,
                user=user,
                password=password,
                host=host,
                port=port
            )
            conn.close()
            print("Database is ready!")
            return True
        except psycopg2.OperationalError:
            retries += 1
            print(f"Database not ready yet. Retry {retries}/{max_retries}")
            time.sleep(retry_interval)
    
    print("Failed to connect to the database after maximum retries")
    return False

# Wait for the database to be ready before creating tables
wait_for_db()

# Create tables
with app.app_context():
    db.create_all()
    print("Database tables created!")

    # Create default admin user if not exists
    from app.models import User
    from werkzeug.security import generate_password_hash
    if not User.query.filter_by(username='hieult').first():
        admin_user = User(
            username='hieult',
            email='hieult@nec.vn',
            password=generate_password_hash('nec@123'),
            role='admin'
        )
        db.session.add(admin_user)
        db.session.commit()
        print("Default admin user created: hieult")
    else:
        print("Default admin user already exists.")

    # Create default assets if none exist
    from app.models import Asset
    from datetime import date
    if Asset.query.count() == 0:
        asset1 = Asset(
            asset_name='Laptop Dell XPS 13',
            asset_type='Laptop',
            serial_number='SN123456',
            purchase_date=date(2023, 1, 15),
            warranty_expiry_date=date(2026, 1, 15),
            cost=1500.00,
            status='Good',
            location='Hanoi Office'
        )
        asset2 = Asset(
            asset_name='iPhone 14 Pro',
            asset_type='Phone',
            serial_number='SN654321',
            purchase_date=date(2022, 9, 10),
            warranty_expiry_date=date(2024, 9, 10),
            cost=1200.00,
            status='New',
            location='HCM Office'
        )
        asset3 = Asset(
            asset_name='Samsung Monitor 27"',
            asset_type='Monitor',
            serial_number='SN789012',
            purchase_date=date(2021, 5, 20),
            warranty_expiry_date=date(2024, 5, 20),
            cost=300.00,
            status='Needs Repair',
            location='Da Nang Office'
        )
        db.session.add_all([asset1, asset2, asset3])
        db.session.commit()
        print("Default assets created.")
    else:
        print("Default assets already exist.")

from app import routes

CORS(app)
