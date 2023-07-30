// App.js or index.js
import React from 'react';
import MainPage from './MainPage';
import LoginPage from "./Pages/Login";
import {useState} from "react";
import './App.css'

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform the login logic here, and if successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <MainPage /> : <LoginPage onLogin={handleLogin} />;
};

export default App;
