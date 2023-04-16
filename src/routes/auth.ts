import passport from 'passport'
import { Strategy } from 'passport-github2'
import { Router, Response } from 'express'
import { sign } from '../utils/jwt'
const router = Router()

const GITHUB_CLIENT_ID = '18bedf7c3a8c72375fc4'
const GITHUB_CLIENT_SECRET = '046fa9f686a0e50289e9f691da68fc4ee7cbe40d'

passport.use(new Strategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    const token = sign(profile.id, profile.username)
    return done(null, {token});
  }
))

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ], session: false }))

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  function(req: any, res: Response) {
    res.redirect(`http://localhost:8080/token-redirect/?token=${req.user.token}`)
})


export default router
