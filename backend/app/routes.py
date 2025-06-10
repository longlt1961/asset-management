from app import app, db
from app.models import User, Asset
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.utils import validate_email

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Please provide all required information.'}), 400

    if not validate_email(email):
        return jsonify({'message': 'Invalid email address.'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists.'}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email address is already registered.'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully.', 'user': new_user.to_dict()}), 201

@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if username:
        if User.query.filter_by(username=username).filter(User.id != user_id).first():
            return jsonify({'message': 'Username already exists.'}), 409
        user.username = username
    if email:
        if not validate_email(email):
            return jsonify({'message': 'Invalid email address.'}), 400
        if User.query.filter_by(email=email).filter(User.id != user_id).first():
            return jsonify({'message': 'Email address is already registered.'}), 409
        user.email = email
    if password:
        user.password = generate_password_hash(password)

    db.session.commit()
    return jsonify({'message': 'User information updated successfully.', 'user': user.to_dict()}), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully.'}), 200

# ASSET CRUD ENDPOINTS
@app.route('/assets', methods=['POST'])
def create_asset():
    data = request.get_json()
    asset_name = data.get('assetName')
    asset_type = data.get('assetType')
    serial_number = data.get('serialNumber')
    purchase_date = data.get('purchaseDate')
    warranty_expiry_date = data.get('warrantyExpiryDate')
    cost = data.get('cost')
    status = data.get('status')
    location = data.get('location')

    if not all([asset_name, asset_type, serial_number, purchase_date, warranty_expiry_date, cost, status, location]):
        return jsonify({'message': 'Please provide all required information.'}), 400

    if Asset.query.filter_by(serial_number=serial_number).first():
        return jsonify({'message': 'Serial number already exists.'}), 409

    try:
        from datetime import datetime
        purchase_date_obj = datetime.strptime(purchase_date, '%Y-%m-%d').date()
        warranty_expiry_date_obj = datetime.strptime(warranty_expiry_date, '%Y-%m-%d').date()
    except Exception:
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    new_asset = Asset(
        asset_name=asset_name,
        asset_type=asset_type,
        serial_number=serial_number,
        purchase_date=purchase_date_obj,
        warranty_expiry_date=warranty_expiry_date_obj,
        cost=cost,
        status=status,
        location=location
    )
    db.session.add(new_asset)
    db.session.commit()
    return jsonify({'message': 'Asset created successfully.', 'asset': new_asset.to_dict()}), 201

@app.route('/assets', methods=['GET'])
def get_all_assets():
    assets = Asset.query.all()
    return jsonify([asset.to_dict() for asset in assets]), 200

@app.route('/assets/<int:asset_id>', methods=['GET'])
def get_asset(asset_id):
    asset = Asset.query.get_or_404(asset_id)
    return jsonify(asset.to_dict()), 200

@app.route('/assets/<int:asset_id>', methods=['PUT'])
def update_asset(asset_id):
    asset = Asset.query.get_or_404(asset_id)
    data = request.get_json()
    asset_name = data.get('assetName')
    asset_type = data.get('assetType')
    serial_number = data.get('serialNumber')
    purchase_date = data.get('purchaseDate')
    warranty_expiry_date = data.get('warrantyExpiryDate')
    cost = data.get('cost')
    status = data.get('status')
    location = data.get('location')

    if serial_number and Asset.query.filter_by(serial_number=serial_number).filter(Asset.id != asset_id).first():
        return jsonify({'message': 'Serial number already exists.'}), 409

    if asset_name:
        asset.asset_name = asset_name
    if asset_type:
        asset.asset_type = asset_type
    if serial_number:
        asset.serial_number = serial_number
    if purchase_date:
        try:
            from datetime import datetime
            asset.purchase_date = datetime.strptime(purchase_date, '%Y-%m-%d').date()
        except Exception:
            return jsonify({'message': 'Invalid purchase date format. Use YYYY-MM-DD.'}), 400
    if warranty_expiry_date:
        try:
            from datetime import datetime
            asset.warranty_expiry_date = datetime.strptime(warranty_expiry_date, '%Y-%m-%d').date()
        except Exception:
            return jsonify({'message': 'Invalid warranty expiry date format. Use YYYY-MM-DD.'}), 400
    if cost is not None:
        asset.cost = cost
    if status:
        asset.status = status
    if location:
        asset.location = location

    db.session.commit()
    return jsonify({'message': 'Asset information updated successfully.', 'asset': asset.to_dict()}), 200

@app.route('/assets/<int:asset_id>', methods=['DELETE'])
def delete_asset(asset_id):
    asset = Asset.query.get_or_404(asset_id)
    db.session.delete(asset)
    db.session.commit()
    return jsonify({'message': 'Asset deleted successfully.'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid username or password.'}), 401
    return jsonify({'message': 'Login successful.', 'user': user.to_dict()}), 200