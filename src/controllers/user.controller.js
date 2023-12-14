import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const getUser=async(req,res)=>{

    try{
        const user = await userModel.findByPk(req.user.id);
        return res.status(200).json({message:'success',user});

    }catch(err){
        return res.status(500).json({message:'error',error:err.message});
    }

}

export const updateUser=async(req,res)=>{

    try{
        const user = await userModel.update({...req.body},{where:{id:req.user.id}});

        return res.status(200).json({ message: 'updated successfully'});

    }catch(err){
        return res.status(500).json({message:'error',error:err.message});
    }

}

export const updatePassword=async(req,res)=>{
    try{
        const{oldPassword,newPassword}=req.body;

        const user=await userModel.findByPk(req.user.id);
        const matchPassword = await bcrypt.compare(oldPassword, user.password);

        if(!matchPassword){
            return res.status(401).json({message:"Old password is incorrect"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALTROUND));

        const [updatedRowsCount]= await userModel.update({password:hashedPassword},{where:{id:req.user.id}})

        if (updatedRowsCount==0) {
            return res.status(400).json({message: 'Password update failed'});
        }

       return res.status(200).json({message:"Your password updated successfully"});
       
    }catch(err){
        res.status(500).json({ message: err.message });
    }

}