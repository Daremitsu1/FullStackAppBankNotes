import React, { useState } from 'react';
import "./app.scss";
import axios from "axios";
import {
  Form,
  FormGroup,
  TextInput,
  Button,
  Loading
} from "carbon-components-react";
import RadarChart from './component/dataviz/RadarChart';

function App() {
  const [varianceValue, setVarianceValue] = useState('');
  const [skewnessValue, setSkewnessValue] = useState('');
  const [curtosisValue, setCurtosisValue] = useState('');
  const [entropyValue, setEntropyValue] = useState('');
  const [predictions, setPredictions] = useState(null); // State variable for predictions
  const [loading, setLoading] = useState(false); // State variable for loading state

  const runPred = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching prediction
      const response = await axios.post("/predict", {
        variance: parseFloat(varianceValue),
        skewness: parseFloat(skewnessValue),
        curtosis: parseFloat(curtosisValue),
        entropy: parseFloat(entropyValue)
      });
      setPredictions(response.data.prediction); // Update predictions state with prediction data
      console.log("Prediction:", response.data);
    } catch (error) {
      console.error("Error predicting:", error);
    } finally {
      setLoading(false); // Set loading state back to false after fetching prediction
    }
  };

  return (
    <div className="App">
      <div className='mainContainer'>
        <Form>
          <FormGroup>
            <TextInput 
              id="variance-input" 
              labelText="Enter Variance"
              onChange={(e) => setVarianceValue(e.target.value)}
              value={varianceValue}
            />
          </FormGroup>
          <FormGroup>
            <TextInput 
              id="skewness-input" 
              labelText="Enter Skewness"
              onChange={(e) => setSkewnessValue(e.target.value)}
              value={skewnessValue}
            />
          </FormGroup>
          <FormGroup>
            <TextInput 
              id="curtosis-input" 
              labelText="Enter Curtosis"
              onChange={(e) => setCurtosisValue(e.target.value)}
              value={curtosisValue}
            />
          </FormGroup>
          <FormGroup>
            <TextInput 
              id="entropy-input" 
              labelText="Enter Entropy"
              onChange={(e) => setEntropyValue(e.target.value)}
              value={entropyValue}
            />
          </FormGroup>
          <FormGroup>
            <Button onClick={runPred}>
              Predict
            </Button>
          </FormGroup>
        </Form>
        <div className='predictContainer'>
          {loading && <Loading description='Loading...' />} {/* Display loading indicator if loading state is true */}
          {predictions !== null && !loading && (
            <div>
              <div>
                The model predicted:
              </div>
              <div className='predictionResult'>
                {parseFloat(predictions)}
              </div>
              <div className='chartContainer'>
                <RadarChart
                variance={parseFloat(varianceValue)}
                skewness={parseFloat(skewnessValue)}
                curtosis={parseFloat(curtosisValue)}
                entropy={parseFloat(entropyValue)}
                prediction={parseFloat(predictions)}
              />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
