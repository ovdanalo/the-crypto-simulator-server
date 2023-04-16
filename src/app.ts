
import express, {Application, Request, NextFunction} from 'express'
import { Error500Response } from './types'
import wallet from './routes/wallet'
import auth from './routes/auth'
import morgan from 'morgan'
import cors from 'cors'
const app: Application = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.use('/auth', auth)
app.use('/wallet', wallet)

app.use((err: Error, req: Request, res: Error500Response, next: NextFunction) => {
    return res.status(500).json({
        message: err.message
    })
})

export default app
