import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken,verifyToken } from "../services/generateAndVerifyToken.js";


export const signup = async (req, res) => {
    try {

        const { firstName, lastName, email, password, phone, gender } = req.body;

        // Check if the email exists
        const userExists =await userModel.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND));

         // Create a new user
        const newUser = await userModel.create({ firstName, lastName, email,password:hashedPassword,phone,gender});

        return res.status(201).json({ message: 'Registration successful' });



    } catch (err) {
        return res.status(500).json({ message: 'error', error: err.message });
    }
}


export const singin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        //Verify password
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Authenticate user with jwt
        const token=generateToken({id:user.id});


       return res.status(200).json({ message: 'signin successful', token });


    } catch (err) {
        return res.status(500).json({ message: 'error', error: err.message });
    }
}