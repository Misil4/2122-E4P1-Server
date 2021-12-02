import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export const verifyJWT = (req,res,next) => {
    const token = req.get('Authorization')
    if (!token) {
        res.send(403)
    }
    const valid = jwt.verify(token,process.env.SECRET_TOKEN)
    return valid ? next() : res.send(401)
}