import express from 'express'
import dotenv from 'dotenv'

import authRoute from './routes/auth'
import protectedRoutes from './routes/protected'
import { connectDB } from './db/connect'
import { notFound } from './middleware/not-found'
import { errorHandlerMiddleware } from './middleware/error-handler'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000;

// middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/user', authRoute);
app.use('/protected', protectedRoutes); // just for an brief example of a protected router

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {

  try {

      const db = await connectDB();
      app.listen(port, () => console.log(`Server listening on port ${port}...`))
    } catch (err) {
      console.log(err);
    }
}

start()
