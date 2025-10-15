import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeSymptoms } from '../services/api'; // Import your real API function

function Analyze() {
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (symptoms.length < 15) {
      setError('Please provide a more detailed description of your symptoms.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // 1. Call the API with the user's symptoms
      const result = await analyzeSymptoms({ symptoms });
      
      // 2. Navigate to the results page on success
      // This is the crucial part: pass BOTH the result and the original symptoms text
      navigate('/results', { state: { analysisResult: result, symptoms: symptoms } });

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to get analysis. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      // 3. Ensure loading is always set back to false
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center">Symptom Analyzer</h1>
      <p className="text-center" style={{ marginBottom: '16px' }}>
        Describe your symptoms in detail. This tool is for educational purposes only.
      </p>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="symptoms">Describe your symptoms</label>
          <textarea
            id="symptoms"
            className="form-input"
            rows="8"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., I have a sharp headache behind my eyes and I'm feeling nauseous..."
            required
            disabled={loading} // Disable textarea while loading
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </form>
    </div>
  );
}

export default Analyze;