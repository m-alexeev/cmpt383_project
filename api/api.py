from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime 
import json
from json import JSONEncoder
import hashlib


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'd2047e924a7c6e4f34f8134e17c7e66f'
db = SQLAlchemy(app)


db.create_all()

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), unique = True, nullable = False)
    image_file = db.Column(db.String(20), nullable = False, default = 'default.jpg')
    password = db.Column(db.String(60), nullable = False)
    notes = db.relationship('Note', backref = 'author', lazy = True)

    def __repr__(self):
        return f"User( '{self.id}','{self.email}', '{self.image_file}')"


class Note(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    title = db.Column(db.String(100), nullable = False)
    date_created = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    content = db.Column(db.Text, nullable = False)
    


    def __repr__(self):
        return f"Note('{self.id}','{self.title}', '{self.content}', '{self.date_created}')"





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
        session['user'] = user_req['email']
        return {'user': user.email, 'redirect': '/'}, 200
    else:
        return {'err': "Incorrect Email or Password"}, 200



@app.route('/register', methods= ['POST'])
def register():
    req = request.data.decode('utf-8')
    user_req = json.loads(req)

    user = User.query.filter_by(email = user_req['email']).first()
    if (user != None):
        return {'err': 'Email is already taken'}
    
    
    salt = 'bounce'
    pwd = user_req['password'] + salt

    hashedPwd = hashlib.md5(pwd.encode())
    hashedPwd = hashedPwd.hexdigest()

    newUser = User(email=user_req['email'], password=hashedPwd)
    db.session.add(newUser)
    db.session.commit()    


    # session
    return {'user':newUser.email}, 200



@app.route('/signout')
def logout():
    session.pop('user', None)
    return {}, 200



@app.route('/getUser')
def getCurUser():
    if (session.get('user')):
        return {"user": session['user']},200
    else:
        return {'redirect': 'true'}



@app.route('/getNotes', methods = ['GET'])
def getuserNotes():
    ##Get user ID
    user = User.query.filter_by(email = session['user']).first()
    userID = user.id

    ##Get Notes for the User    
    notes = Note.query.filter_by(user_id = userID).all()

    jsonArr = []
    for note in notes:
        jsonArr.append({'id':note.id, 'title':note.title, 'body':note.content, 'date': note.date_created})


    return {'notes':jsonArr}, 200



@app.route('/saveNote', methods = ['POST'])
def saveUserNote():
    req = request.data.decode('utf-8')
    json_req = json.loads(req)

    title = json_req['title']
    body = json_req['body']

    # Get user
    user = User.query.filter_by(email = session['user']).first()
    userID = user.id

    #Create and save Note
    note = Note(user_id = userID, title = title, content = body, date_created= datetime.utcnow() )
    db.session.add(note)
    db.session.commit()

    return {'res': 'OKAY'}, 200



@app.route('/deleteNote', methods = ['POST'])
def deleteUserNote():
    req = request.data.decode('utf-8')
    delete_req = json.loads(req)

    id = delete_req['id']

    note = Note.query.filte_by(id = id).delete()
    db.commit()

    return {'res': "OKAY"}, 200