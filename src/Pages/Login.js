import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [batch, setBatch] = useState('');
    const [showOtpOption, setShowOtpOption] = useState(false);
    const [showUserDetailsInput, setShowUserDetailsInput] = useState(false)

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send request to backend to register and generate OTP
            await axios.post('http://localhost:8080/auth/register', { email, password });
            setShowOtpInput(true);
            setShowOtpOption(true);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send request to backend to verify OTP
            const response = await axios.post('http://localhost:8080/auth/verify', { email, otp });
            const authToken  = response.data;

            console.log(response)
            if(authToken){
                console.log(authToken)
                setShowUserDetailsInput(true);
            }
            // Save authToken to local storage or state for future requests
            // Redirect the user to the dashboard or home page
            // setShowOtpInput(false);
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send request to backend for login
            await axios.post('http://localhost:8080/auth/login', { email, password });
            // Save authToken to local storage or state for future requests
            // Redirect the user to the dashboard or home page
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleDetailsSubmit = async (e) =>{
        e.preventDefault();
        try{
            console.log(email, password, name, batch, department)
            await axios.post('http://localhost:8080/auth/saveUserInfo', { email, password, name, batch, department });
        }
        catch (error) {
            console.error('Error Adding User Details:', error);
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => setShowOtpInput(false)}>Login</button>
                <button onClick={() => setShowOtpInput(true)}>Register</button>
            </div>
            {showOtpInput ? (
                <>
                    <form onSubmit={handleEmailSubmit}>
                        <label>Enter Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Enter Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Register</button>
                    </form>
                    {showOtpOption && (
                        <>
                            <form onSubmit={handleOtpSubmit}>
                                <label>Enter OTP:</label>
                                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                <button type="submit">Submit OTP</button>
                            </form>

                            {showUserDetailsInput && (
                                <form onSubmit={handleDetailsSubmit}>
                                    <label>Name:</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    <label>Department:</label>
                                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                    <label>Batch:</label>
                                    <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} />

                                    <button type="submit">Submit Personal Details</button>
                                </form>
                            )}
                        </>

                        // </form>
                    )}
                </>
            ) : (
                <form onSubmit={handleLoginSubmit}>
                    <label>Enter Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Enter Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;
