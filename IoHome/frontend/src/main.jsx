import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="902887132561-6n6g3sikk8gi3u81q7p0of2eaqh0cvqk.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

