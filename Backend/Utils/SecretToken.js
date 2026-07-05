import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const createAccessToken = (id) =>{
    return jwt.sign({id},process.env.access_token_secret,{
        expiresIn:15*60
    })
}

export const createRefreshToken = (id) =>{
    return jwt.sign({id},process.env.refresh_token_secret,{
        expiresIn:3*24*60*60
    })
}