import jwt from 'jsonwebtoken'

const SECRET = 'secret'

export const sign = (user_id: string, username: string): string => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 36),
    user_id,
    username
  }, SECRET);
}

export const verify = (token: string): string | false => {
  try {
    const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload
    return decoded.user_id
  } catch(err) {
    return false
  }
}
