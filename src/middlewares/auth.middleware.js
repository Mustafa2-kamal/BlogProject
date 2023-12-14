import userModel from "../models/user.model.js";
import { verifyToken } from "../services/generateAndVerifyToken.js";

export const auth=async(req,res,next)=>{

    try{
        const {authorization}=req.headers;

        if(!authorization?.startsWith("bearer")){
            return res.status(401).json({message:'Invalid token'});
        }
        const token=authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({message:'Authorization failed,token is required'})
        }
    
        const decode=verifyToken(token,process.env.JWT_SECRET);

        const user=await userModel.findOne({where:{id:decode.id}});

        if(!user){
            return res.status(401).json({message:'Invalid token'});
        }
        req.user=user;
    
        next();

    }catch(err){
        return res.status(500).json({message:'error',error:err.message});
    }

}