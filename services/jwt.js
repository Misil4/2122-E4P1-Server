import admin from 'firebase-admin';
import jsonwebtoken from  'jsonwebtoken'
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
import dotenv from 'dotenv'
import { json } from 'express';
dotenv.config()
admin.initializeApp({
    credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID.replace(/\\n/g, '\n'),
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID.replace(/\\n/g, '\n'),
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL.replace(/\\n/g, '\n'),
        client_id: process.env.FIREBASE_CLIENT_ID.replace(/\\n/g, '\n')
    })
});
const verifyToken = async (token) => {
        const decoded = await admin.auth().verifyIdToken(token,true)
        return decoded ? true : false;
}

const generateAccessToken = (email) => {
    return jsonwebtoken.sign({email : email},process.env.SECRET_TOKEN.replace(/\\n/g, '\n'),{expiresIn : process.env.EXPIRES_IN.replace(/\\n/g, '\n')})
}
const generateRefreshToken = (email) => {
    return jsonwebtoken.sign({email : email},process.env.SECRET_TOKEN_REFRESH.replace(/\\n/g, '\n'))
}
export const createJWT = async (req,res) =>{
    let token = req.body.token;
    let email = req.body.email
    admin.auth().verifyIdToken(token,true).then(response => {
        res.send({data : {access_token :generateAccessToken(email),refresh_token : generateRefreshToken(email)}})
    })
    .catch(error => {
        console.error(error);
        res.send(401)
    })
}

export const createNewJWT = async (req,res) =>{
    let token = req.body.token;
    let email = req.body.email;
    try { 
        let valid = jsonwebtoken.verify(token,process.env.SECRET_TOKEN_REFRESH.replace(/\\n/g, '\n'));
        if(valid) 
        {
        res.send({data : {access_token :generateAccessToken(email),refresh_token : generateRefreshToken(email)}})
        }
    } catch (error) {
        console.error(error);
        res.send(401)
    }
    
}
