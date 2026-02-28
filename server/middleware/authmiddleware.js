import jwt, { decode } from "jsonwebtoken"
import 'dotenv/config'
import usermodel from "../models/usermodel.js"

const authmiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) {
      return res.status(401).json({ message: "Please login" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const {id} = decoded

    const user = await usermodel
      .findById(id)
      .select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    req.user = user

    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export default authmiddleware