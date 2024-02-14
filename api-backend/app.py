from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

# Load the pickle file
with open('D:/Python Projects/FullStackAppBankNotes/models/classifier.pkl', 'rb') as f:
    classifier = pickle.load(f)

# Defining class for model predictions
class ScoringItem(BaseModel):
    variance: float
    skewness: float
    curtosis: float
    entropy: float

# Define the POST endpoint
@app.post("/predict")
async def predict(item: ScoringItem):
    # Extracting values from the request body
    variance = item.variance
    skewness = item.skewness
    curtosis = item.curtosis
    entropy = item.entropy
    
    # Making prediction using the classifier
    prediction = classifier.predict([[variance, skewness, curtosis, entropy]])
    
    # Convert numpy.int64 to int
    prediction = prediction.item()
    
    return {"prediction": prediction}
