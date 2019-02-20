#!/usr/bin/env node

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const args = require('minimist')(process.argv.slice(2))
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId: process.env.REACT_APP_AWS_COINDROP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_AWS_COINDROP_COGNITO_APP_CLIENT_ID
}

const pool_region = process.env.REACT_APP_AWS_COINDROP_COGNITO_REGION

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

function Login() { 

    const email = args['email']
    const pass = args['pass']

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : email,
        Password : pass,
    });

    var userData = {
        Username : email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
        },
        onFailure: function(err) {
            console.log(err);
        },
    });
}

try {
    if (process.argv.length <= 3) {
        console.log('usage: node auth.js --email=foo@bar.com --pass=baz')
        process.exit()
    }

    Login()
} catch (e) {
    console.log(e)
}
