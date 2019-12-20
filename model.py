
# Importing the libraries
import numpy as np
import pandas as pd
import pickle
import requests
import json

# Importing the dataset
data = pd.read_csv("links.csv")
movies = pd.read_csv("movies.csv")
data = pd.merge(data,movies,on='movieId')
ratings = pd.read_csv("ratings.csv")
tags = pd.read_csv("tags.csv")
data = pd.merge(data,ratings,on='movieId')
ratings = pd.DataFrame(data.groupby('title')['rating'].mean())
ratings['count'] = data.groupby('title')['rating'].count()

matrix = data.pivot_table(index = 'userId',columns = 'title', values = 'rating')
temp = ratings.sort_values('count',ascending =False).head(11) 
def func(moviename):
	# try:
		user_rating_fg = matrix[moviename]
		similar_to_forrest = matrix.corrwith(user_rating_fg)
		corr_fg = pd.DataFrame(similar_to_forrest, columns=['Correlation'])
		corr_fg.dropna(inplace=True)
		corr_fg = corr_fg.join(ratings['count'])
		a = corr_fg[corr_fg['count'] > 100].sort_values(by='Correlation',ascending=False).head(10)
		return a.iloc[:,1].index
 
	# except KeyError:
 #    		return("Not in db")

	
'''
# Predicting the Test set results
y_pred = func.predict(X_test)
'''
# Saving model to disk
pickle.dump(func, open('func.pkl','wb'))

	# Loading model to compare the results
model = pickle.load( open('func.pkl','rb'))
print(func('Skyline '))


'''import json
import ibm_watson

assistant = ibm_watson.AssistantV1(
    version='2019-02-28',
    iam_apikey='<insert_ibm_api_key>',
    url='https://gateway-lon.watsonplatform.net/assistant/api'
)
++++++++++++++++
# Importing the dataset
dataset = pd.read_csv('Salary_Data.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, 1].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.33, random_state = 0)

# Fitting Simple Linear Regression to the Training set
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)

# Predicting the Test set results
y_pred = regressor.predict(X_test)

# Saving model to disk
pickle.dump(regressor, open('model.pkl','wb'))

# Loading model to compare the results
model = pickle.load( open('model.pkl','rb'))
print(model.predict([[1.8]]))
'''

