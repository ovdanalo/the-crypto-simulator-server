export {}

declare global {
  namespace Express {
    export interface Request {
      user_id: string
    }
  }
}