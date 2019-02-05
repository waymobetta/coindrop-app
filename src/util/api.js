import Swagger from 'swagger-client'
import dotenv from 'dotenv'
import spec from '../swagger/swagger.json'
dotenv.config()

export const baseURL = process.env.API_BASE_URL || 'http://localhost:5000/api/v1'

spec.host = baseURL.replace(/.*\/\/([\w+:]+)\/.*/, '$1')

let client

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

async function initClient () {
  client = await Swagger({ spec })
}

initClient()
