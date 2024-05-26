import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { GoogleOAuthProvider } from '@react-oauth/google';
=======
>>>>>>> f806e71f65fa7d42cda1107fa42dbcbfaf29ab9e

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <GoogleOAuthProvider clientId="522824290406-v4v3c8bcv7dev5qanhfkmsm68kmu9eig.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
=======
    <App />
>>>>>>> f806e71f65fa7d42cda1107fa42dbcbfaf29ab9e
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
