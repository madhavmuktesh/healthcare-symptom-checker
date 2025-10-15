import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header() {
  const { isAuthenticated, user, logout } = useAuth(); // Destructure 'user' from the context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Medical Analyzer
        </Link>
        <nav>
          {isAuthenticated && user ? (
            <>
              <Link to="/analyze">Analyzer</Link>
              <Link to="/history">History</Link>
              <p>{user.username}</p>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;