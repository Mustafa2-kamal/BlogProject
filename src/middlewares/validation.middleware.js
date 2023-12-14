
const methods=["body", "params", "headers", "query"];

export const validation = (schema)=>{

    return (req,res,next)=>{

        let validationArray=[];

        methods.forEach((key)=>{
            if(schema[key]){
            const {error}=schema[key].validate(req[key],{abortEarly: false});

            if(error){
                error.details.forEach((err)=>{
                    validationArray.push(err.message);
                })
         
            }
        }
        })

        if(validationArray.length>0){
            return res.status(500).json({message:'validation error',error:validationArray});
        }

        next();

    }


}