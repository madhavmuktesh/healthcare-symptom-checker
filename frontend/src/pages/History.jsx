import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import { format } from 'date-fns'; // A great library for formatting dates
import './History.css'; // New CSS file for this component
import { Link } from 'react-router-dom';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (err) {
        setError('Failed to fetch history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []); // The empty array [] means this effect runs once when the component mounts

  if (loading) {
    return <div className="text-center">Loading history...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="history-container">
      <h1>Your Past Analyses</h1>
      {history.length === 0 ? (
        <p>You have no saved analyses yet.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            // 2. Wrap the history item in a Link component
            <Link to={`/history/${item._id}`} key={item._id} className="history-item-link">
              <div className="history-item">
                <div className="history-item-header">
                  <h3>Symptoms Reported</h3>
                  <span>{format(new Date(item.createdAt), 'PPpp')}</span>
                </div>
                <p className="symptoms-snippet">{item.symptoms}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;