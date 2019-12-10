from nltk.tokenize import word_tokenize
import json
from flask import Flask, request, jsonify,render_template, url_for
import numpy
import pickle
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
flag = 0
@app.route('/api',methods=['POST','GET'])
def hello():
	
	x1 = []
	model = pickle.load(open('func.pkl','rb'))
	data = request.get_json(force = True)
	if(data['type']=="text"):
		z = chatbot(data['moviename'])
		return jsonify(z)
	else:
		try:  
		    prediction = model(data['moviename'])
		    if(prediction.size>0):
		    	for i in prediction:
		    		x1.append(i)
		    	output1 = {'name1' : x1,'type' : 'movie1'}
		    	return jsonify(output1)
		    else:
		    	return jsonify(chatbot("Not in DB"))


		except KeyError:
			return jsonify(chatbot("Not in DB"))

		except TypeError:
			return jsonify(chatbot("Not in DB"))	

		##return jsonify({"name1":"fuck yeah","type":"text"})

def chatbot(l):
	movie = ['movie', 'movies', 'films', 'film']
	greet = ['hey','hello','hi','hii','hiii','heyy','heyo']
	thank = ['thanks','thankyou', 'thank you','thenks','thank you']

	if(l == "Not in DB"):
		return({"name1":"Not in DB","type":"text"})

	l = l.lower()
	s = word_tokenize(l)
	for i in range(len(s)):
		for j in range(len(movie)):
			if(s[i] == movie[j]):
				return({"name1":"Please tell me a movie name you like, this would help me give you personalized recommendations.","type":"movie"})
	        
		for j in range(len(greet)):
			if(s[i]==greet[j]):
				return({"name1":"Hi Human! How can I help?","type":"text"})
	        
		for j in range(len(thank)):
			if(s[i]==thank[j]):
				return({"name1":"Glad to help!"})

			
	return({"name1":"I am not trained yet for that! Please try again","type":"text"})
                



if __name__ == '__main__':
	app.run(port=5000, debug=True)
