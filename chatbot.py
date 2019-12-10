from nltk.tokenize import word_tokenize
import json
from flask import Flask, request, jsonify,render_template, url_for
import numpy
from flask_cors import CORS
import requests
import urllib.parse
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer


app = Flask(__name__)
CORS(app)

@app.route('/apii',methods=['POST','GET'])
def hello1():
	x1 = []
	##model = pickle.load(open('func.pkl','rb'))
	r = {"hello":"naman"}
	
	print(r)
	#data = request.get_json(force = True)
	#r = json.dumps(r)
	#data = requests.get(url = 'http://localhost:6000/apii')

	query = urllib.parse(self.path).query
	query_components = dict(qc.split("=") for qc in query.split("&"))
	imsi = query_components["address"]

	print(imsi)
	return jsonify(imsi)

if __name__ == '__main__':
	app.run(port=6000, debug=True)