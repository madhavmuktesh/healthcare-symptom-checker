import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout and Auth Components
import Header from './components/layout/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import History from './pages/History';
import HistoryDetail from './pages/HistoryDetail'; // 1. Import the detail page

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* --- Protected Routes --- */}
          <Route path="/analyze" element={<ProtectedRoute><Analyze /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          
          {/* 2. Add this dynamic route for the detail page */}
          <Route path="/history/:id" element={<ProtectedRoute><HistoryDetail /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
}

export default App;