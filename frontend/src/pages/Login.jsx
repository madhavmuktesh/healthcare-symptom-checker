import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginUser } from '../services/api';
import { Lock, Mail, Eye, EyeOff, Loader2, CheckCircle, ShieldCheck } from 'lucide-react';
import './Login.css';

// Loading Spinner Component
const LoadingSpinner = () => (
    <Loader2 className="animate-spin" size={20} />
);

function LoginPage() {
    // State management for the form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Hooks for navigation and authentication context
    const navigate = useNavigate();
    const auth = useAuth();

    // The function that calls your backend
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Call the login function from your api.js service
            const data = await loginUser({ username, password });
            
            // Save the token using the AuthContext
            auth.login(data.accessToken);

            // Redirect to the main analyzer page on success
            navigate('/analyze');

        } catch (err) {
            // Display an error message if login fails
            setError(err.response?.data?.message || 'Invalid username or password.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper medical-gradient">
            <div className="login-container">
                {/* Header Section */}
                <div className="login-header">
                    <div className="logo-section">
                        <ShieldCheck size={48} className="logo-icon" />
                        <h1 className="app-title">Medical Analyzer</h1>
                    </div>
                    <p className="app-subtitle"></p>
                </div>

                <div className="form-wrapper slide-in">
                    {/* Form Header */}
                    <div className="form-header">
                        <h2 className="form-title">Welcome Back</h2>
                        <p className="form-subtitle">Sign in to continue to your account</p>
                    </div>

                    {/* Display error message if it exists */}
                    {error && (
                        <div className="error-message" style={{marginBottom: '1rem', textAlign: 'center'}}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="login-form">
                        {/* Email Input */}
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="relative input-with-icon">
                                <Mail size={20} className="input-icon" />
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    required 
                                    placeholder="Enter your email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                    className="icon-input"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="relative input-with-icon">
                                <Lock size={20} className="input-icon" />
                                <input 
                                    id="password" 
                                    name="password" 
                                    type={passwordVisible ? "text" : "password"} 
                                    required 
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="icon-input password-input"
                                />
                                <button 
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    tabIndex={-1}
                                >
                                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Form Options */}
                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>
                        
                        {/* Submit Button */}
                        <button type="submit" className="login-button" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <LoadingSpinner />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <Lock size={20} className="button-icon" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>

                        {/* Signup Link */}
                        <p className="signup-link">
                            Don't have an account? <Link to="/register">Sign up here</Link>
                        </p>
                    </form>

                    {/* Disclaimer */}
                    <div className="disclaimer">
                        <CheckCircle size={16} />
                        <p>Your data is secured with end-to-end encryption</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
