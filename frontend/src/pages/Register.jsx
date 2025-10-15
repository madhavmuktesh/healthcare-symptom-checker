import React, { useState } from 'react';
import './Register.css'; // Import the corresponding CSS

// --- SVG Icon Components ---
const AddUserIcon = () => (
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
    </svg>
);

const EmailIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
    </svg>
);

const PasswordIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
    </svg>
);

const ConfirmIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

// --- Main Register Page Component ---
function RegisterPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
        if (/\d/.test(pass) && /[!@#$%^&*()]/.test(pass)) strength++;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };
    
    // This is where you would make the API call to your backend
    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Registering user:", { username: e.target.email.value, password });
        // Example: register({ username: e.target.email.value, password });
    };

    return (
        <div className="register-wrapper medical-gradient">
            <div className="register-container">
                <div className="header-section slide-in">
                    <div className="logo-container pulse-animation">
                        <AddUserIcon />
                    </div>
                    <h2 className="header-title">Join HealthCheck Pro</h2>
                    <p className="header-subtitle">Create your account to start symptom assessment</p>
                </div>

                <div className="form-wrapper slide-in">
                    <div className="form-header">
                        <h3 className="form-title">Create Account</h3>
                        <p className="form-subtitle">Fill in your details to get started</p>
                    </div>

                    <form onSubmit={handleRegister} className="register-form">
                        <div className="input-group">
                            <label htmlFor="email">Email Address (Username)</label>
                            <div className="relative">
                                <div className="input-icon-left"><EmailIcon /></div>
                                <input id="email" name="email" type="email" required placeholder="john.doe@example.com" />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="relative">
                                <div className="input-icon-left"><PasswordIcon /></div>
                                <input id="password" name="password" type="password" required value={password} onChange={handlePasswordChange} placeholder="Create a strong password" />
                            </div>
                            <div className="strength-indicator">
                                <div className={`strength-bar ${passwordStrength >= 1 ? 'weak' : ''}`}></div>
                                <div className={`strength-bar ${passwordStrength >= 2 ? 'medium' : ''}`}></div>
                                <div className={`strength-bar ${passwordStrength >= 3 ? 'strong' : ''}`}></div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative">
                                <div className="input-icon-left"><ConfirmIcon /></div>
                                <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
                            </div>
                             {confirmPassword && password !== confirmPassword && <p className="password-mismatch">Passwords do not match</p>}
                        </div>

                        <button type="submit" className="register-button">
                            Create Account
                        </button>

                        <p className="signin-link">
                            Already have an account? <a href="/login">Sign in here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;