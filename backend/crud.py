from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
import datetime
from json import JSONEncoder
import json

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120))
    _interests = db.Column(db.String)
    @property
    def interests(self):
        return [x for x in self._interests.split(',')]
    @interests.setter
    def interests(self, value):
        self._interests += ',%s' % value

    def __init__(self, username, email,interests):
        self.username = username
        self.email = email
        self._interests = interests

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)


class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose for a User
        fields = ('username', 'email','interests')

class UserJSONEncoder(JSONEncoder):
    def default(self,obj):
        if isinstance(obj,User):
            return {
                'username':obj.username,
                'email':obj.email,
                'interests':obj.interests
            }
        return super(UserJSONEncoder, self).default(obj)

        

class Session(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    created_by = db.Column(db.String(80))
    location = db.Column(db.String(120))
    description = db.Column(db.Text())
    date_time = db.Column(db.DateTime(timezone=True), default=datetime.datetime.utcnow)

    def __init__(self,created_by,location,description,date_time):
        self.location = location
        self.created_by = created_by
        self.description = description
        self.date_time = date_time

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

class SessionSchema(ma.Schema):
    class Meta:
        #Fields to expose for a Session
        fields = ('created_by','location','description','date_time')


user_schema = UserSchema()
users_schema = UserSchema(many=True)

session_schema = SessionSchema()
sessions_schema = SessionSchema(many=True)

db.drop_all()
db.create_all()
# endpoint to create new user
@app.route("/user", methods=["POST"])
def add_user():
    
    username = request.json['username']
    email = request.json['email']
    interests = request.json['interests']
    
    new_user = User(username, email,interests)
    #new_user_json = json.dumps(new_user)
    db.session.add(new_user)
    db.session.commit()

    
    print(new_user.toJSON())
    #return new_user.toJSON()


# endpoint to show all users
@app.route("/user", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)


# endpoint to get user detail by id
@app.route("/user/<id>", methods=["GET"])
def user_detail(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)


# endpoint to update user
@app.route("/user/<id>", methods=["PUT"])
def user_update(id):
    user = User.query.get(id)
    username = request.json['username']
    email = request.json['email']
    interests = request.json['interests']
    user.email = email
    user.username = username
    user._interests = interests

    db.session.commit()
    return user_schema.jsonify(user)


# endpoint to delete user
@app.route("/user/<id>", methods=["DELETE"])
def user_delete(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)


if __name__ == '__main__':
    app.run(debug=True)