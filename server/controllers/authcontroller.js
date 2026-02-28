import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'
import usermodel from '../models/usermodel.js';
import 'dotenv/config.js'

const JWT = jsonwebtoken


export const register = async (req, res) => {

   const { name, email, password } = req.body

   if (!name || !email || !password) {
      return res.json({ message: "please fillout form" })
   }

   try {

      const existinguser = await usermodel.findOne({ email })

      if (existinguser) {
         return res.json({ message: 'User already exists' })
      }
      const hashedpassword = await bcrypt.hash(password, 10)
      const user = new usermodel({ name, email, password: hashedpassword })
      await user.save();

      res.json({status:200, message:'user logged in successfully'})


   } catch (error) {
      return res.json({ message: error.message })
   }

}

export const login = async (req,res)=>{
   const { email, password } = req.body
    
   if(!email || !password) {
      return res.json({message:'inputfeild is empty'})
   }

   try {
      const user = await usermodel.findOne({email})
      if(!user){
         res.json({message:'user does not exists'})
      }

      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch){
         res.json({message:'email or password is incorrect'})
      }

      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

      res.cookie('token', token , {
         maxage:7 * 24 * 60 * 60 * 1000
      });

      return res.json({status:200, message:'User logged in successfully',
         user: user
      })


   } catch (error) {
      res.json({message:'error',error})
   }

}

export const logout = async (req, res)=>{
try {
   res.clearCookie('token')
   return res.json({success:true, message:'User logout successfully'})
} catch (error) {
   res.json({message:'User logout failed'})
}
}