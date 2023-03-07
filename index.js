import dotenv from 'dotenv'
import express from 'express'
import {dataBaseConnection} from "./db.js"
import cors from 'cors'
import { signupRouter } from './routes/signupuser.js'
import { loginRouter } from './routes/loginUser.js'
import { isSignedIn } from './controllers/auth.js'
import { contentRouter } from './routes/content.js'

//env configaration
dotenv.config()

//db connections
dataBaseConnection();

const app = express();
const PORT = process.env.PORT

//middlewares
app.use(express.json());
app.use(cors())

//middlewares for routers
app.use('/api/signup', signupRouter)
app.use('/api/login', loginRouter)
app.use('/api/content', isSignedIn, contentRouter)


app.listen(PORT, ()=>console.log(`Server is up and running in Port ${PORT}`))

