import React, { useState } from 'react';
import './ChillerEfficiencyCalculator.css';

const ChillerEfficiencyCalculator = () => {
  const [formData, setFormData] = useState({
    RT: "", // Plant Ton
    KW_TOT: "", // Total Plant Power
    KW_CHH: "", // Total Chiller Power
    GPM: "", // Flow
    DeltaCHW: "", // Chilled Water Delta T
    DeltaCDW: "", // Condenser Water Delta T
    CDHI: "", // Condenser Water Supply Temperature
    CDLO: "", // Condenser Water Return Temperature
    PresentCH: "", // Present Chiller Load
    PresentCHP: "", // Present Chilled Water Pump Load %
    PresentCDS: "", // Present Condenser Water Pump Load %
    PresentCT: "", // Present Cooling Tower Fan Load %
    Temperature: "", // Ambient Temperature
    WBT_C: "" // Wet Bulb Temperature
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch('http://localhost:3000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction(null);
    }
  };

  return (
    <div className="css-selector">
      {/* Navigation bar */}
      <nav>
        <div className="navbar">
          <h2>DevRise</h2>
        </div>
      </nav>

      {/* Tagline section */}
      <div className="tagline">
        <h1>Stay Cool,</h1>
        <h1>Stay Comfortable!</h1>
      </div>

      {/* Form section */}
      <div className="container">
        <h2 className="form-title">Chiller Load Input</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields Based on the useState Structure */}
          <div className="input-group">
            <div className="input-box">
              <label htmlFor="RT">Plant Ton (RT):</label>
              <input type="number" id="RT" name="RT" value={formData.RT} onChange={handleChange} placeholder="Enter plant tonnage" step="0.1" required />
            </div>

            <div className="input-box">
              <label htmlFor="KW_TOT">Total Plant Power (kW):</label>
              <input type="number" id="KW_TOT" name="KW_TOT" value={formData.KW_TOT} onChange={handleChange} placeholder="Enter total plant power" step="0.1" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="KW_CHH">Total Chiller Power (kW):</label>
              <input type="number" id="KW_CHH" name="KW_CHH" value={formData.KW_CHH} onChange={handleChange} placeholder="Enter total chiller power" step="0.1" required />
            </div>

            <div className="input-box">
              <label htmlFor="GPM">Flow (GPM):</label>
              <input type="number" id="GPM" name="GPM" value={formData.GPM} onChange={handleChange} placeholder="Enter flow rate" step="0.1" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="DeltaCHW">Chilled Water Delta T (°C):</label>
              <input type="number" id="DeltaCHW" name="DeltaCHW" value={formData.DeltaCHW} onChange={handleChange} placeholder="Enter chilled water delta T" step="0.1" required />
            </div>

            <div className="input-box">
              <label htmlFor="DeltaCDW">Condenser Water Delta T (°C):</label>
              <input type="number" id="DeltaCDW" name="DeltaCDW" value={formData.DeltaCDW} onChange={handleChange} placeholder="Enter condenser water delta T" step="0.1" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="CDHI">Condenser Water Supply Temperature (°C):</label>
              <input type="number" id="CDHI" name="CDHI" value={formData.CDHI} onChange={handleChange} placeholder="Enter condenser water supply temperature" step="0.1" required />
            </div>

            <div className="input-box">
              <label htmlFor="CDLO">Condenser Water Return Temperature (°C):</label>
              <input type="number" id="CDLO" name="CDLO" value={formData.CDLO} onChange={handleChange} placeholder="Enter condenser water return temperature" step="0.1" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="PresentCH">Present Chiller Load (%):</label>
              <input type="number" id="PresentCH" name="PresentCH" value={formData.PresentCH} onChange={handleChange} placeholder="Enter present chiller load" step="0.1" required />
            </div>

            <div className="input-box">
              <label htmlFor="PresentCHP">Present Chilled Water Pump Load (%):</label>
              <input type="number" id="PresentCHP" name="PresentCHP" value={formData.PresentCHP} onChange={handleChange} placeholder="Enter present chilled water pump load" step="0.1" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="PresentCDS">Present Condenser Water Pump Load (%):</label>
              <input type="number" id="PresentCDS" name="PresentCDS" value={formData.PresentCDS} onChange={handleChange} placeholder="Enter present condenser water pump load" step="0.1" required />
            </div>

            <div className="input-box">
              <label htmlFor="PresentCT">Present Cooling Tower Fan Load (%):</label>
              <input type="number" id="PresentCT" name="PresentCT" value={formData.PresentCT} onChange={handleChange} placeholder="Enter present cooling tower fan load" step="0.1" required />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="Temperature">Ambient Temperature (°C):</label>
              <input type="number" id="Temperature" name="Temperature" value={formData.Temperature} onChange={handleChange} placeholder="Enter ambient temperature" step="0.1" required />
            </div>

            <div className="input-box">
              <label htmlFor="WBT_C">Wet Bulb Temperature (°C):</label>
              <input type="number" id="WBT_C" name="WBT_C" value={formData.WBT_C} onChange={handleChange} placeholder="Enter wet bulb temperature" step="0.1" required />
            </div>
          </div>

          <div className="submitButton">
            <input type="submit" value="Submit" />
          </div>
        </form>

        {/* Display Prediction Result */}
        {prediction !== null && (
          <div className='resultContainer'>
            <div className="prediction-result">
              <h3>Estimated Chiller Load:</h3>
              <p>{prediction}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChillerEfficiencyCalculator;
