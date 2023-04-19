import * as dotenv from 'dotenv'
dotenv.config()
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test'
export const PORT = process.env.PORT || 3000
export const CLOUD_NAME = process.env.CLOUD_NAME
export const API_KEY = process.env.API_KEY
export const API_SECRET = process.env.API_SECRET