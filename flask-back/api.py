from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime 
import json
from json import JSONEncoder
import hashlib
from flask import jsonify

import go_module


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'd2047e924a7c6e4f34f8134e17c7e66f'
app.config['SERVER_NAME'] = 'flask-api:5000'
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

class Mood(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    mood = db.Column(db.String(25), nullable = False)
    mood_intensity = db.Column(db.Integer, nullable=  False)
    counter = db.Column(db.Integer, nullable = False)
    total = db.Column(db.Integer, nullable = False)
    date = db.Column(db.DateTime, nullable = False)

    def __repr__(self):
        return f"('{self.mood}', '{self.mood_intensity}')"



@app.route('/login', methods = ['POST'])
def login():
    req = request.data.decode('utf-8')
    user_req = json.loads(req)

    
    user = User.query.filter_by(email = user_req['email']).first()
    if (user == None):
        return jsonify({'err': 'Incorrect Email or Password'}), 200
    
    salt = 'bounce'
    pwd = user_req['password'] + salt
    
    hashedPwd = hashlib.md5(pwd.encode())
    hashedPwd = hashedPwd.hexdigest()

    if (user.password == hashedPwd):
        session['user'] = user_req['email']
        return jsonify({'user': user.email, 'redirect': '/'}), 200
    else:
        return jsonify({'err': "Incorrect Email or Password"}), 200



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
    return jsonify({'user':newUser.email}), 200



@app.route('/signout')
def logout():
    session.pop('user', None)
    return jsonify({})



@app.route('/getUser')
def getCurUser():
    if (session.get('user')):
        return jsonify({"user": session['user']}),200
    else:
        return jsonify({'redirect': 'true'})



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


    return jsonify({'notes':jsonArr}), 200



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

    return jsonify({'res': "OKAY"}), 200



@app.route('/deleteNote', methods = ['POST'])
def deleteUserNote():
    req = request.data.decode('utf-8')
    delete_req = json.loads(req)

    id = delete_req['id']

    note = Note.query.filter_by(id = id).delete()
    db.session.commit()

    return jsonify({'res': "OKAY"}), 200



@app.route('/sortNotes', methods = ['POST'])
def sortNotes():
    req = request.data.decode('utf-8')
    sort_req = json.loads(req)
    #* Get user notes
    user = User.query.filter_by(email = session['user']).first()
    uid = user.id 
    notes = Note.query.filter_by(user_id = uid).all()

    titles = []
    if sort_req["mode"] == "Title": 
        for note in notes:
            titles += [note.title]

    dates = []
    if sort_req["mode"] == "Date":
        for note in notes:
            #* Convert to readable time 
            dates += [note.date_created.strftime("%m/%d/%Y %H:%M:%S")]

    newNotes = []

    if len(dates) > 0: 
        bte = go_module.covertToBytesString(dates)
        if sort_req["order"] == "Ascending":  
            dates = go_module.sortArrayC(bte, 1)
        else:
            dates = go_module.sortArrayC(bte, 0)
        for date in dates: 
            for note in notes: 
                if note.date_created.strftime("%m/%d/%Y %H:%M:%S") == date:
                    newNotes += [note]
                    break

    if len(titles) > 0:
        bte = go_module.covertToBytesString(titles)
        if sort_req["order"] == "Ascending":
            titles = go_module.sortArrayC(bte, 1)
        else: 
            titles = go_module.sortArrayC(bte, 0)
        for title in titles:
            for note in notes:
                if note.title == title:
                    newNotes += [note]
                    break

    jsonArr = []
    for note in newNotes: 
        jsonArr.append({'id':note.id, 'title':note.title, 'body':note.content, 'date': note.date_created})

    return jsonify({'notes': jsonArr}), 200



@app.route('/updateUser', methods = ['POST'])
def updateUser():
    req = request.data.decode('utf-8')
    update_req = json.loads(req)

    print (update_req)


    user = User.query.filter_by(email = session['user']).first()
    for key in update_req.keys():
        if key == "rem":
            continue
        if key ==  "pwd":
            salt = 'bounce'
            pwd = update_req['pwd'] + salt        
            hashedPwd = hashlib.md5(pwd.encode())
            hashedPwd = hashedPwd.hexdigest()
            #* Update Pwd        
            user.password = hashedPwd
        if key == "email":
            user.email = update_req['email']

    session['user'] = user.email
    db.session.commit()
    return jsonify({"status": "Updated", 'email':user.email}), 200



@app.route('/saveMood',methods = ["POST"])
def saveMood():
    req = request.data.decode('utf-8')
    save_req = json.loads(req)

    timestamp = datetime.utcnow()

    email = session['user']
    user = User.query.filter_by(email = email).first()

    moods = Mood.query.filter_by(user_id= user.id).all()
    if len(moods) == 0:
        for mood in save_req:
            newMood = Mood(user_id=user.id, mood = mood, mood_intensity = save_req[mood] ,date = timestamp)
            db.session.add(newMood)
    else:
        for mood in save_req: 
            for savedMood in moods:
                if mood == savedMood.mood and save_req[mood] > 0:
                    savedMood.counter += 1
                    savedMood.mood_intensity = int((savedMood.total + save_req[mood])/savedMood.counter)
                    savedMood.total += save_req[mood]                   

        for updatedMood in moods:
            print(updatedMood)

    db.session.commit()

    return jsonify({"Status": "OK"}), 200
    

@app.route('/getMoods', methods = ["GET"])
def getUserMoods(): 
   
    user = User.query.filter_by(email = session['user']).first()
    moods = Mood.query.filter_by(user_id = user.id).all()

    moods_arr = []

    for mood in moods:
        moods_arr.append({mood.mood: mood.mood_intensity})    

    return jsonify({"moods": moods_arr}),200



if  __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)