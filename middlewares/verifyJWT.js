import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createRequire } from "module";
const require = createRequire(import.meta.url);


dotenv.config()

export const verifyJWT = (req, res, next) => {
    const token = req.get('Authorization')
    var path = require('path');
    if (!token) {
        res.sendFile(path.resolve('./401.html'));
    }
    try {
        const valid = jwt.verify(token, process.env.SECRET_TOKEN)
        return valid ? next() : res.send(402)
    } catch (error) {
        console.error(error)
    }
}