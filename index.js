import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {connectDB} from './DB/connection.js';
import userRouter from './src/routes/user.route.js';
import authRouter from './src/routes/auth.route.js';
import blogRouter from './src/routes/blog.route.js';

const app = express();
const PORT = process.env.PORT ;  

connectDB();

app.use(express.json());
app.use(cors());

app.use('/user',userRouter); 
app.use('/auth',authRouter);
app.use('/blog',blogRouter);

app.all('*',(req,res)=>{
    return res.status(404).json({message:'Page Not Found'}); 
})


app.listen(PORT, (err) =>{
    if(err){
        console.log(err);
    }
    console.log(`Server listening on port ${PORT}`)
});
