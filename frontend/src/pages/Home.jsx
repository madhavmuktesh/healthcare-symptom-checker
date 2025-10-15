import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We'll create this CSS file next

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Medical Analyzer AI</h1>
        <p className="hero-subtitle">
          Your intelligent partner for understanding your health symptoms. Get instant, AI-powered educational insights.
        </p>
        <Link to="/analyze" className="btn btn-primary hero-cta">
          Start Your Analysis
        </Link>
        <p className="disclaimer-text">
          This tool is for informational purposes only and is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}

export default Home;