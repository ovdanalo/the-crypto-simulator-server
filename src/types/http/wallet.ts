import { Request, Response } from 'express'
import { Wallet } from '../data'

interface BuyWalletRequestBody {
    name: string
    amount: number
}
export type BuyWalletRequest = Request<any, any, BuyWalletRequestBody>

export type BuyWalletResponse = Response<Wallet>

export type GetWalletResponse = Response<Wallet[]>

interface SellWalletRequestParams {
    wallet_id: number
}

interface SellWalletRequestBody {
    amount: number
}
export type sellWalletRequest = Request<SellWalletRequestParams, any, SellWalletRequestBody >
export type sellWalletResponse = Response<Wallet>

export type resetWalletResponse = Response<{deleted: number}>
