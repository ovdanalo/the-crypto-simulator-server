import { Request, Response, NextFunction } from 'express'
import { verify  } from '../utils/jwt'
export const auth = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization === undefined)
            return res.status(401).send()

        const user_id = verify(req.headers.authorization)
        if (user_id === false)
            return res.status(401).send()
        req.user_id = user_id
        next()
    } catch (e) {
        res.status(401).end()
    }
}