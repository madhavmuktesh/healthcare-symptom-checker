import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHistoryById } from '../services/api';
import { format } from 'date-fns';
import './Results.css'; // Reuses the styles from the Results page

function HistoryDetail() {
  const { id } = useParams(); // Gets the ':id' from the URL
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true); // Ensure loading is true at the start
      try {
        const data = await getHistoryById(id);
        setAnalysis(data);
      } catch (err) {
        setError('Failed to fetch analysis details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]); // Re-run this effect if the ID in the URL changes

  // 1. Render loading state first to prevent errors
  if (loading) {
    return <div className="text-center">Loading details...</div>;
  }

  // 2. Render error state if the API call failed
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // 3. Render a "not found" state if the API returned no data
  if (!analysis) {
    return (
        <div className="text-center">
            <h2>Analysis Not Found</h2>
            <p>We couldn't find an analysis with that ID.</p>
            <Link to="/history" className="btn btn-secondary">Back to History</Link>
        </div>
    );
  }

  // 4. Safely destructure the data with default values
  const { result = {}, symptoms, createdAt } = analysis;
  const { possible_conditions = [], recommended_next_steps = [] } = result;

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Analysis Details</h1>
        <span>{format(new Date(createdAt), 'PPPP p')}</span>
      </div>
      
      <div className="results-section">
        <h2>Symptoms You Reported</h2>
        <p className="symptoms-text">{symptoms}</p>
      </div>

      <div className="results-section">
        <h2>Possible Conditions</h2>
        {possible_conditions.length > 0 ? (
          possible_conditions.map((condition, index) => (
            <div key={index} className="condition-card">
              <h3>{condition.name}</h3>
              <p>{condition.rationale}</p>
            </div>
          ))
        ) : (
          <p>No conditions were identified.</p>
        )}
      </div>

      <div className="results-section">
        <h2>Recommended Next Steps</h2>
        {recommended_next_steps.length > 0 ? (
            <ul className="next-steps-list">
                {recommended_next_steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
        ) : (
            <p>No next steps were provided.</p>
        )}
      </div>

      <div className="results-actions">
          <Link to="/history" className="btn btn-secondary">
              Back to History
          </Link>
      </div>
    </div>
  );
}

export default HistoryDetail;