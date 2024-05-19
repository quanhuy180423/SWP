// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationFormv2 from './components/RegistrationFormv2';
import LoginFormv2 from './components/LoginFormv2';
//add demo
// import { GoogleOAuthProvider } from '@react-oauth/google';

import BookingForm from './components/BookingForm';
import Banner from './components/Banner';
import Header from './pages/Header';
import HomePage from './components/HomePage';



const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginFormv2 />} />
          <Route path="/register" element={<RegistrationFormv2 />} />
          <Route path="/header" element={<Header />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/booking' element={<BookingForm />} />
          <Route path='/banner' element={<Banner />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
