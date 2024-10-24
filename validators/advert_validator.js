import Joi from "joi";


export const addAdsValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required()
});


export const updateAdsValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    price: Joi.number(),
    image: Joi.string()
});