// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import RegistrationForm from './components/RegistrationForm';
import './App.css';
import RegistrationFormv2 from './components/RegistrationFormv2';
import LoginFormv2 from './components/LoginFormv2';
//add demo
// import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginFormv2 />} />
          <Route path="/register" element={<RegistrationFormv2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
