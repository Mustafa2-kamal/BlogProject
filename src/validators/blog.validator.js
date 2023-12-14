import Joi from 'joi';

export const blogSchema={
    body:Joi.object().required().keys({
        title:Joi.string().min(3).max(30).required(),
        body:Joi.string().min(5).max(500).required()
    })
}
