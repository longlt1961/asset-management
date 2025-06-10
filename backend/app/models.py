from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.username}>'

    def __init__(self, username, email, password, role='user'):
        self.username = username
        self.email = email
        self.password = password
        self.role = role

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat()
        }

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    asset_name = db.Column(db.String(120), nullable=False)
    asset_type = db.Column(db.String(80), nullable=False)
    serial_number = db.Column(db.String(120), unique=True, nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    warranty_expiry_date = db.Column(db.Date, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Asset {self.asset_name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'assetName': self.asset_name,
            'assetType': self.asset_type,
            'serialNumber': self.serial_number,
            'purchaseDate': self.purchase_date.isoformat() if self.purchase_date else None,
            'warrantyExpiryDate': self.warranty_expiry_date.isoformat() if self.warranty_expiry_date else None,
            'cost': self.cost,
            'status': self.status,
            'location': self.location
        }