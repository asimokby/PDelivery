from flask import Flask
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS

app = Flask(__name__)  # flask app
CORS(app)  # allow cors
app.config['SECRET_KEY'] = 'j@48#56882djjjewija8293ncwoiedmi4wa0'
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('connect')
def userConnected():
    print('User has connected')


@socketio.on('message')
def handleMessage(msg):
	send({'data': msg['data'], 'name':msg['name']}, broadcast=True, include_self=False)
    



if __name__ == '__main__':
	socketio.run(app, port=8000)

