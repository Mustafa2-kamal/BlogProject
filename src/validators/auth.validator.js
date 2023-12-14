import Joi from 'joi';

export const signupSchema={
    body:Joi.object().required().keys({
        firstName:Joi.string().min(3).max(20).required(),
        lastName:Joi.string().min(3).max(20).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).max(20).required(),
        phone:Joi.string().regex(/^\d{3}[-. ]?\d{3}[-. ]?\d{4}$/).required().messages({
            'string.pattern.base':'Phone number must have 10 digits.'
        }),
        gender:Joi.string().valid('male','female').required()
    })
}

export const signinSchema={
    body:Joi.object().required().keys({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
}