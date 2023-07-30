// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Import your custom CSS file for styling

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(true);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [batch, setBatch] = useState('');
    const [showOtpOption, setShowOtpOption] = useState(false);
    const [showUserDetailsInput, setShowUserDetailsInput] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [temp, setTemp] = useState([]);
    const [loginSuccessful, setLoginSuccessful] = useState(false);

    const handleEmailSubmit = async (e) => {
        try {
            e.preventDefault();
            // Check if the user is already registered, if not, show registration form
            const url = "http://localhost:8080/auth/isRegistered/" + email;
            console.log(url)
            const response = await axios.get(url);
            const isRegistered = response.data;
            console.log(isRegistered);

            if (isRegistered) {
                setShowOtpInput(false);
            } else {
                await axios.post('http://localhost:8080/auth/register', { email, password });
                // setShowOtpInput(false);
                setShowOtpOption(true);
            }

        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send request to backend to verify OTP
            const response = await axios.post('http://localhost:8080/auth/verify', { email, password, otp });
            const authToken = response.data;

            if (authToken) {
                setShowUserDetailsInput(true);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send request to backend for login
            const response = await axios.post('http://localhost:8080/auth/login', { email, password });

            const authToken = response.data["authToken"];

            if (authToken === undefined) {
                setLoginSuccessful(true);
            } else {
                localStorage.setItem("authToken", authToken);
                onLogin();
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleDetailsSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send request to backend to save user information
            await axios.post('http://localhost:8080/auth/saveUserInfo', {
                email,
                password,
                name,
                batch,
                department,
                selectedCourse,
            });
            setShowOtpInput(false);
            setShowOtpOption(false);
            setShowUserDetailsInput(false);
        } catch (error) {
            console.error('Error Adding User Details:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-heading">
                    <h2>{showOtpInput ? 'Register' : 'Login'}</h2>
                </div>
                {showOtpInput ? (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="form-group">
                            <label>Enter Email:</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Enter Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit">Register</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label>Enter Email:</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Enter Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                )}

                {/* Show OTP input field after registration */}
                {showOtpOption && (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="form-group">
                            <label>Enter OTP:</label>
                            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit">Submit OTP</button>
                        </div>
                    </form>
                )}

                {/* Show user details input fields after verifying OTP */}
                {showUserDetailsInput && (
                    <form onSubmit={handleDetailsSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Department:</label>
                            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Batch:</label>
                            <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <button type="submit">Submit Personal Details</button>
                        </div>
                    </form>
                )}

                {loginSuccessful && (
                    <div className="login-error">
                        User or Password Incorrect
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
