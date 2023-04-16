import { Request, Response, NextFunction } from 'express'
import { BuyWalletRequest, BuyWalletResponse, GetWalletResponse, resetWalletResponse, sellWalletRequest, sellWalletResponse, Wallet } from '../types';
import db from '../database/db_connection'

export const buyCryptoController = async (req: BuyWalletRequest, res: BuyWalletResponse, next: NextFunction) => {
    try {
        const current_wallet: Wallet[] = await db<Wallet>('wallet')
            .where('user_id', req.user_id)
            .where('name', req.body.name)
            .select('*')
        
        let wallet: Wallet[]
        if (current_wallet.length > 0) {
            wallet = await db<Wallet>('wallet')
                .update({
                    amount: current_wallet[0].amount + req.body.amount,
                    total: current_wallet[0].total + req.body.amount
                })
                .where('id', current_wallet[0].id)
                .returning('*')
        } else {
            wallet = await db<Wallet>('wallet')
                .insert({
                    ...req.body,
                    total: req.body.amount,
                    user_id: req.user_id
                })
                .returning('*')
        }

        return res.status(200).json(wallet[0])
    } catch (e) {
        next(e)
    }
}

export const getCryptoController = async (req: Request, res: GetWalletResponse, next: NextFunction) => {
    try {
        const wallet: Wallet[] = await db<Wallet>('wallet')
            .where('user_id', req.user_id)
            .select('*')
        

        return res.status(200).json(wallet)
    } catch (e) {
        next(e)
    }
}

export const sellCryptoController = async (req: sellWalletRequest, res: sellWalletResponse, next: NextFunction) => {
    try {
        const current_wallet: Wallet[] = await db<Wallet>('wallet')
            .where('id', req.params.wallet_id)
            .where('user_id', req.user_id)
            .select('*')
        
        if (current_wallet.length === 0)
            throw new Error('Wallet not found')

        if (current_wallet[0].amount < req.body.amount)
            throw new Error('You do not own enougth amount')

        const wallet: Wallet[] = await db<Wallet>('wallet')
        .update({
            amount: current_wallet[0].amount - req.body.amount
        })
        .where('id', current_wallet[0].id)
        .returning('*')

        return res.status(200).json(wallet[0])
    } catch (e) {
        next(e)
    }
}

export const resetCryptoController = async (req: Request, res: resetWalletResponse, next: NextFunction) => {
    try {
        const deleted = await db('wallet')
            .where('user_id', req.user_id)
            .del()
        

        return res.status(200).json({deleted})
    } catch (e) {
        next(e)
    }
}

