import Swagger from 'swagger-client'
import dotenv from 'dotenv'
import Amplify, { Auth } from 'aws-amplify'
import spec from '../swagger/swagger.json'
import CoindropAuth from './CoindropAuth'
dotenv.config()

// export const baseURL = 'http://api.coindrop.io/v1/'
export const baseURL = 'http://localhost:5000/v1/'

spec.host = baseURL.replace(/.*\/\/([\w.:]+)\/.*/, '$1')

let client

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_AWS_COINDROP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_COINDROP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_COINDROP_COGNITO_APP_CLIENT_ID
  }
})

async function initClient () {
  client = await Swagger({
    spec,
    requestInterceptor (req) {
      const token = accessToken()
      if (token) {
        req.headers['Authorization'] = `Bearer ${token}`
        return req
      }
    }
  })
  window.client = client
}

export class User {
  static async create ({ cognitoAuthUserId }) {
    try {
      const { body: result, ok } = await client.apis.user.user_create({
        payload: {
          cognitoAuthUserId
        }
      })

      if (!ok) {
        return {
          result: null,
          error: 'no ok'
        }
      }

      return {
        result,
        error: null
      }
    } catch (err) {
      return {
        result: null,
        error: err
      }
    }
  }
}

export const signup = async (email, password) => {
  const newUser = await Auth.signUp(email, password)

  const { body: result, ok } = await client.apis.user.user_create({
    payload: {
      cognitoAuthUserId: newUser.userSub
    }
  })

  if (!ok) {
    throw new Error('could not create user')
  }

  return result
}

export const signupUser = async (email, password) => {
  const newUser = await Auth.signUp(email, password)

  const jwt = newUser.user.storage.accessToken

  const { body: result, ok } = await CoindropAuth.signUp(newUser.userSub, jwt)

  if (!ok) {
    throw new Error('could not create user')
  }
  return result
}

export const login = async (email, password) => {
  const { signInUserSession: { accessToken: { jwtToken } } } = await Auth.signIn(email, password)

  localStorage.setItem('accessToken', jwtToken)

  const userId = await getUserId(await getCognitoUserId())
  localStorage.setItem('userId', userId)

  return jwtToken
}

export const logout = () => {
  Auth.signOut({ global: true })
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userId')
}

export const isLoggedIn = async () => {
  try {
    await currentUser()
    return true
  } catch (err) {
    return false
  }
}

export const currentUser = async () => {
  return Auth.currentAuthenticatedUser()
}

export const getCognitoUserId = async () => {
  return (await Auth.currentAuthenticatedUser()).username
}

export const getUserId = async () => {
  const cached = localStorage.getItem('userId')
  if (cached) {
    return cached
  }

  const cognitoUserId = await getCognitoUserId()

  if (!cognitoUserId) {
    throw new Error('User not logged in')
  }

  const res = await client.apis.users.users_list({
    cognitoAuthUserId: cognitoUserId
  })

  return res.body.id
}

export const resetPassword = async (email, confirmationCode, newPassword) => {
  return Auth.forgotPasswordSubmit(email, confirmationCode, newPassword)
}

export const sendResetPasswordLink = async (email) => {
  return Auth.forgotPassword(email)
}

export const getTasks = async (userId) => {
  const { body: result, ok } = await client.apis.tasks.tasks_list({
    payload: {
      userId
    }
  })

  if (!ok) {
    throw new Error('could not get user tasks')
  }

  return result.tasks
}

export const getWallets = async () => {
  const { body: result, ok } = await client.apis.wallets.wallets_show()

  if (!ok) {
    throw new Error('could not get user wallet')
  }

  return result
}

export const accessToken = () => {
  return localStorage.getItem('accessToken')
}

initClient()
