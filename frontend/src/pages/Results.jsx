import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { saveHistory } from '../services/api'; // Import the saveHistory API function
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get both the result and symptoms from the location state
  const { analysisResult, symptoms } = location.state || {};

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  if (!analysisResult) {
    return (
        <div className="results-container text-center">
            <h2>No Analysis Data</h2>
            <p>Please go back to the analyzer to enter your symptoms.</p>
            <Link to="/analyze" className="btn btn-primary">Go to Analyzer</Link>
        </div>
    );
  }

  const { possible_conditions, recommended_next_steps, confidence_hint, disclaimer } = analysisResult;

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      await saveHistory({ symptoms, result: analysisResult });
      setIsSaved(true);
    } catch (err) {
      setSaveError('Could not save to history. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="results-container">
      {/* ... existing results display ... */}
       <div className="results-header">
        <h1>Analysis Results</h1>
        <span className={`confidence-badge ${confidence_hint}`}>
          {confidence_hint} confidence
        </span>
      </div>

      <div className="results-section">
        <h2>Possible Conditions</h2>
        {possible_conditions.map((condition, index) => (
          <div key={index} className="condition-card">
            <h3>{condition.name}</h3>
            <p>{condition.rationale}</p>
          </div>
        ))}
      </div>

      <div className="results-section">
        <h2>Recommended Next Steps</h2>
        <ul className="next-steps-list">
          {recommended_next_steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      
      <div className="disclaimer-box">
        <p><strong>Disclaimer:</strong> {disclaimer}</p>
      </div>

      <div className="results-actions">
        {saveError && <p className="error-message">{saveError}</p>}
        <button onClick={() => navigate('/analyze')} className="btn btn-secondary">
            Analyze Again
        </button>
        <button onClick={handleSave} className="btn btn-primary" disabled={isSaving || isSaved}>
            {isSaved ? '✔ Saved' : isSaving ? 'Saving...' : 'Save to History'}
        </button>
      </div>
    </div>
  );
}

export default Results;