import React from 'react';
import ReactDOM from 'react-dom'; // Change import path
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="522824290406-v4v3c8bcv7dev5qanhfkmsm68kmu9eig.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
