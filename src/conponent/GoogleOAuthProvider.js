import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="522824290406-v4v3c8bcv7dev5qanhfkmsm68kmu9eig.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
