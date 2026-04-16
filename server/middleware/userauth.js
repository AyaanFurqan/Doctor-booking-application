import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const userauth = (req, res, next) => {
    const { token } = req.cookies
    try {
        if (!token) {
            return res.json({ success: false, message: 'Login first' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.json({ success: false, message: 'User not authenticated' })
        }

        const {id} = decoded

        req.body = id

        next()

    }
    catch (error) {
        res.json(error.message)
        console.log(error)
    }
}