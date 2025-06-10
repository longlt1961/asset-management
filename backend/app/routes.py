from app import app, db
from app.models import User
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