import dotenv from 'dotenv'
import path from 'path'
/* This code is using the `dotenv` package to load environment variables from a `.env` file located in
the root directory of the project. process.cwd() means the root directory */
dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  secret_key: process.env.secret_key,
  refresh_secret_key: process.env.refresh_secret_key,
}
