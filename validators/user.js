import Joi from "joi";
export const addRegisterValidator = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const addLoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});