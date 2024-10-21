import Joi from "joi";

export const addAdsValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    icon: Joi.string().required()
});

export const updateAdsValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    completed: Joi.boolean(),
    icon: Joi.string()
});

export const deleteAdsValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    completed: Joi.boolean(),
    icon: Joi.string()
});

