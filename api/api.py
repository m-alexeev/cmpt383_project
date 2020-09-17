from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime 
import json
from json import JSONEncoder
import hashlib

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)


db.create_all()

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    image_file = db.Column(db.String(20), nullable = False, default = 'default.jpg')
    password = db.Column(db.String(60), nullable = False)
    notes = db.relationship('Note', backref = 'author', lazy = True)

    def __repr__(self):
        return f"User('{self.email}', '{self.image_file}')"




class Note(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    title = db.Column(db.String(100), nullable = False)
    date_created = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    content = db.Column(db.Text, nullable = False)

    def __repr__(self):
        return f"User('{self.title}', '{self.date_created}')"



class JsonEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__




@app.route('/login', methods = ['POST'])
def login():
    req = request.data.decode('utf-8')
    user_req = json.loads(req)

    
    user = User.query.filter_by(email = user_req['email']).first()
    if (user == None):
        return {'err': 'Incorrect Email or Password'}, 200
    
    salt = 'bounce'
    pwd = user_req['password'] + salt
    
    hashedPwd = hashlib.md5(pwd.encode())
    hashedPwd = hashedPwd.hexdigest()

    if (user.password == hashedPwd):
        return {'user': user.email, 'redirect': '/'}, 200
    else:
        return {'err': "Incorrect Email or Password"}, 200


@app.route('/register', methods= ['POST'])
def register():
    req = request.data.decode('utf-8')
    user_req = json.loads(req)
    #print(user['email'])

    user = User.query.filter_by(email = user_req['email']).first()
    if (user != None):
        return {'err': 'email already taken'}
    
    
    salt = 'bounce'
    pwd = user_req['password'] + salt

    hashedPwd = hashlib.md5(pwd.encode())
    hashedPwd = hashedPwd.hexdigest()

    newUser = User(email=user_req['email'], password=hashedPwd)
    db.session.add(newUser)
    db.session.commit()    

    return {'user':newUser.email}, 200


@app.route('/time')
def get_cur_time():
    return {'time': datetime.utcnow()}