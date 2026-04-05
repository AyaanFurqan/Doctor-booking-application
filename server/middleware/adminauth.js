import jwt from 'jsonwebtoken'
 const adminauth = async (req, res, next) => {
    try {
        const { atoken } = req.cookies
        if (!atoken) {
            return res.json({ success: false, message: 'Unauthorized! Login Again' })
        }

        const tokendecode = jwt.verify(atoken, process.env.JWT_SECRET)
        if (tokendecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Uauthorized! Login Again' })
        }

        next()

    } catch (error) {
        res.json({ success: false, message: error })
        console.log(error)
    }
}

export default adminauth;