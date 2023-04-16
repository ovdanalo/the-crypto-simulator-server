import { Router } from 'express'
import { buyCryptoValidator, sellCryptoValidator } from '../validators/wallet'
import { buyCryptoController, getCryptoController, sellCryptoController, resetCryptoController } from '../controllers/wallet'
import { auth } from '../custom_middlewares/auth'

const router = Router()

router.post(
    '/',
    auth,
    buyCryptoValidator,
    buyCryptoController
)

router.get(
    '/',
    auth,
    getCryptoController
)

router.post(
    '/:wallet_id',
    auth,
    sellCryptoValidator,
    sellCryptoController
)

router.delete(
    '/',
    auth,
    resetCryptoController
)

export default router