import dotenv from 'dotenv'
dotenv.config()

export const baseURL = process.env.API_BASE_URL || 'http://localhost:5000/api/v1'

//export const baseURL = 'http://123.123.123.123:5000/api/v1'
