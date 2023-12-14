import jwt from 'jsonwebtoken';

export const generateToken=(payload,secret=process.env.JWT_SECRET,expiresIn='2h')=>{
    const token=jwt.sign(payload, secret, { expiresIn });
    return token;
};


export const verifyToken=(token,secret=process.env.JWT_SECRET)=>{
    const decode=jwt.verify(token,secret);
    return decode;
};