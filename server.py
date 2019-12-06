
# Import libraries
import numpy as np
from flask import Flask, request, jsonify,render_template, url_for
import pickle
import model
import json
import logging
from flask_cors import CORS
import json
from ibm_watson import ToneAnalyzerV3
import ibm_watson

# assistant = ibm_watson.AssistantV1(
# 	version='2019-02-28',
# 	iam_apikey='tt10Bkn5vJAodgYCX4GmsMpSM3xrr6cIjZW9NAQbYdy-',
# 	url='https://gateway.watsonplatform.net/assistant/api'
# )

from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

authenticator = IAMAuthenticator('tt10Bkn5vJAodgYCX4GmsMpSM3xrr6cIjZW9NAQbYdy-')
assistant = AssistantV2(
    version='2019-02-28',
    authenticator=authenticator
)

assistant.set_service_url('https://gateway-wdc.watsonplatform.net/assistant/api')

app = Flask(__name__)
CORS(app)

@app.route('/api',methods=['POST'])
def hello():
	x1 = []
	model = pickle.load(open('func.pkl','rb'))
	# Get the data from the POST request.
	##z = 1
	
	data = request.get_json(force=True)
	# try:
	# 	data.context
	# except AttributeError:

		
	response = assistant.message(
		workspace_id='3c98135b-53fc-4bf7-a885-0bb5e6c915cb',
		input={'text': data["moviename"]},
		context = data['context'],
		).get_result()

# 	tone_analyzer = ToneAnalyzerV3(
#     version='2017-09-21',
#     iam_apikey='dI4Q2feKszzH6heDVKjatupNX4eIcima5jA8EuUgjdxf',
#     url='https://gateway-lon.watsonplatform.net/tone-analyzer/api'
# )

# 	tone_analysis_user = tone_analyzer.tone(
#     {'text': data['moviename']},
#     content_type='application/json'
# ).get_result()
# 	tone_analysis_bot = tone_analyzer.tone(
#     {'text': response['output']['text'][0]},
#     content_type='application/json'
# ).get_result()

	try:
		tone_bot = tone_analysis_bot['document_tone']['tones'][0]['tone_name']
	except IndexError:
		tone_bot = "Neutral"

	try:
		tone_user = tone_analysis_user['document_tone']['tones'][0]['tone_name']
	except IndexError:
		tone_user = "Neutral"
		# exp1 = { 'exp' : response['output']['text'][0] , 'context' : response['context']}
		# return jsonify(exp1)
		# else:
	
	
	if response['output']['text'][0] == 'Following are your personalized recommendations: ':
		try:  
		    prediction = model(response['context']['movie_name'])
		    if(prediction.size>0):
		    	for i in prediction:
		    		x1.append(i)
		    	output1 = {'name1' : x1,'context' : response['context'],'type' : 'movie','sentiment_bot': tone_bot, 'sentiment_user': tone_user}
		    	return jsonify(output1)
		    else:
		    	
		    	response = assistant.message(
		workspace_id='3c98135b-53fc-4bf7-a885-0bb5e6c915cb',
		input={'text': 'not in db'},
		context = data['context'],
		).get_result()
		    	exp1 = {'name1' : response['output']['text'] , 'context' : response['context'], 'type' : 'chat','sentiment_bot': tone_bot, 'sentiment_user': tone_user}
		    	return jsonify(exp1)
		        # z = 0
		        # return jsonify("Hello! How can I help")
		except KeyError:
			response = assistant.message(
		workspace_id='3c98135b-53fc-4bf7-a885-0bb5e6c915cb',
		input={'text': 'not in db'},
		context = data['context'],
		).get_result()
			exp1 = {'name1' : response['output']['text'] , 'context' : response['context'], 'type' : 'chat','sentiment_bot': tone_bot, 'sentiment_user': tone_user}	
			return jsonify(exp1)

		except TypeError:
			response = assistant.message(
		workspace_id='3c98135b-53fc-4bf7-a885-0bb5e6c915cb',
		input={'text': 'not in db'},
		context = data['context'],
		).get_result()
			exp1 = {'name1' : response['output']['text'] , 'context' : response['context'], 'type' : 'chat','sentiment_bot': tone_bot, 'sentiment_user': tone_user}	
			return jsonify(exp1)

		

	else:
		exp1 = {'name1' : response['output']['text'] , 'context' : response['context'], 'type' : 'chat','sentiment_bot': tone_bot, 'sentiment_user': tone_user}	
		return jsonify(exp1)

	
	## exp1 = {'name1' : response['output']['text'][0] ,'name2' : " ",'name3' : " ",'name4' : " ",'name5' : " ",'name6' : " ",'name7' : " ",'name8' : " ",'name9' : " ",'name10' : " ", 'context' : response['context'],'z':data["z"]}
		#         return jsonify(output1)
		##if((response['output']['text'][0]) == '"Okay! Please tell me a movie name you like, this would help me give you personalized recommendations."'):
		# if(data["z"]==3):
			
		#     try:
			  
	
		#         prediction = model(data["moviename"])
		#         output1 = {'name1' : prediction[0],'name2' : prediction[1],'name3' : prediction[2],'name4' : prediction[3],'name5' : prediction[4],'name6' : prediction[5],'name7' : prediction[6],'name8' : prediction[7],'name9' : prediction[8],'name10' : prediction[9], 'context' : response['context'],'z':data["z"]}
		#         return jsonify(output1) 
		#         # return jsonify('Happy to Help')
		#         # z = 0
		#         # return jsonify("Hello! How can I help")
		#     except KeyError:
		#         output1 = {'name1' : "Sorry! That one is not in my database. Please try again." ,'name2' : " ",'name3' : " ",'name4' : " ",'name5' : " ",'name6' : " ",'name7' : " ",'name8' : " ",'name9' : " ",'name10' : " ", 'context' : response['context'],'z':data["z"]}
		#         return jsonify(output1)
			
		# else:
			
		#     exp1 = { 'exp' : response['output']['text'][0] , 'context' : response['context'],'z':data["z"]}
		#     return jsonify(exp1)

		
			
			# prediction = model(exp)
			# print('Naman>>>>>',exp)
			# output1 = {'name1' : prediction[0],'name2' : prediction[1],'name3' : prediction[2],'name4' : prediction[3],'name5' : prediction[4],'name6' : prediction[5],'name7' : prediction[6],'name8' : prediction[7],'name9' : prediction[8],'name10' : prediction[9]}
			# print(output1)
			# return jsonify(output1) 
			#         ##return jsonify(exp1)
	   ## else:
			 
	##return render_template("index.html", output = output1)
		
   
if __name__ == '__main__':
	app.run(port=5000, debug=True)
