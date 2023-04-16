import {body, validationResult, matchedData, param} from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const buyCryptoValidator = [
    body('name').isString().isLength({min: 1, max: 255}),
    body('amount').isInt({min: 1}),
    (req: Request, res: Response, next: NextFunction) => {
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        
        req.body = matchedData(req, { locations: ['body']})

        next()
    }
]

export const sellCryptoValidator = [
    param('wallet_id').isInt().toInt(),
    body('amount').isInt({min: 1}),
    (req: any, res: Response, next: NextFunction) => {
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        
        req.body = matchedData(req, { locations: ['body']})
        req.params = matchedData(req, { locations: ['params']})
        next()
    }
]