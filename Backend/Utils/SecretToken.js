import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export default createAccessToken = (id) =>{
    return jwt.sign({id},process.env.access_token_secret,{
        expiresIn:15*60
    })
}

export default createRefreshToken = (id) =>{
    return jwt.sign({id},process.env.access_token_secret,{
        expiresIn:3*24*60*60
    })
}