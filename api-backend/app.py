# Bring in our dependencies
from fastapi import FastAPI
from pydantic import BaseModel
import requests, pickle

# Load the pickle file
with open('D:/Python Projects/FullStackAppBankNotes/models/classifier.pkl', 'rb') as f:
    classifier = pickle.load(f)

app = FastAPI()

class item(BaseModel):
    variance = requests.args.get('variance')
    skewness = requests.args.get('skewness')
    curtosis = requests.args.get('curtosis')
    entropy = requests.args.get('entropy')
    prediction = classifier.predict([[variance, skewness, curtosis, entropy]])

@app.get("/")
def welcome():
    return "Hello World!"