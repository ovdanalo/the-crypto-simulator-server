import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import db from './database/db_connection'

const start = async() => {
    try {
        await db.raw('SELECT 1 = 1')
        console.log('Sqlite connection made')

        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        })

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

start()
