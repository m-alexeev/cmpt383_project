import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_cur_time():
    return {'time': time.time()}