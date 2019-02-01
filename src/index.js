import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import dotenv from 'dotenv'
dotenv.config()

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_AWS_COINDROP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_COINDROP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_COINDROP_COGNITO_APP_CLIENT_ID
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
