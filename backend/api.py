from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
import datetime
from json import JSONEncoder
import json
from geolocation.main import GoogleMaps
from geolocation.distance_matrix.client import DistanceMatrixApiClient

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'api.sqlite')
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

    def __init__(self, username, email, interests):
        self.username = username
        self.email = email
        self._interests = interests

    def toJSON(self):
        dict = {
            'username':self.username,
            'email':self.email,
            'interests':self.interests
            }

        return jsonify(dict)

class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose for a User
        fields = ('username', 'email', 'interests')

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
        dict = {
            'created_by':self.created_by,
            'location':self.location,
            'description':self.description,
            'date_time':self.date_time
            }
        return jsonify(dict)

class SessionSchema(ma.Schema):
    class Meta:
        #Fields to expose for a Session
        fields = ('created_by','location','description','date_time')


user_schema = UserSchema()
user_schemas = UserSchema(many=True)

session_schema = SessionSchema()
session_schemas = SessionSchema(many=True)

# db.drop_all()
# db.create_all()


########## USER DB FUNCTIONS ###########

# endpoint to create new user
@app.route("/user", methods=["POST"])
def add_user():
    username = request.json['username']
    email = request.json['email']
    interests = request.json['interests']

    new_user = User(username, email, interests)
    #new_user_json = json.dumps(new_user)
    db.session.add(new_user)
    db.session.commit()

    return new_user.toJSON()


# endpoint to show all users
@app.route("/user", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = user_schemas.dump(all_users)
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



########## SESSION DB FUNCTIONS ###########

# endpoint to create new session
@app.route("/session", methods=["POST"])
def add_session():
    created_by = request.json['created_by']
    location = request.json['location']
    description = request.json['description']
    date_time = datetime.datetime.now()

    new_session = Session(created_by, location, description, date_time)

    db.session.add(new_session)
    db.session.commit()

    return new_session.toJSON()


# endpoint to show all sessions
@app.route("/session", methods=["GET"])
def get_session():
    all_sessions = Session.query.all()
    result = session_schemas.dump(all_sessions)
    return jsonify(result.data)


# endpoint to get user detail by id
@app.route("/session/<id>", methods=["GET"])
def session_detail(id):
    session = Session.query.get(id)
    return session_schema.jsonify(session)


# endpoint to update user
@app.route("/session/<id>", methods=["PUT"])
def session_update(id):
    session = Session.query.get(id)
    created_by = request.json['created_by']
    location = request.json['location']
    description = request.json['description']

    user.created_by = created_by
    user.location = location
    user.description = description

    db.session.commit()
    return session_schema.jsonify(session)


# endpoint to delete user
@app.route("/session/<id>", methods=["DELETE"])
def session_delete(id):
    session = Session.query.get(id)
    db.session.delete(session)
    db.session.commit()

    return session_schema.jsonify(session)


##### SEARCH SESSIONS ######

@app.route('/results', methods=['GET'])
def search_results():
    address="Facebook London"
    google_maps = GoogleMaps(api_key='AIzaSyDf88Cz44T6LhWHyqW9GfeYSqF2Ih1GN8o')
    location = google_maps.search(location=address)

    return location.all()







if __name__ == '__main__':
    app.run(debug=True)
