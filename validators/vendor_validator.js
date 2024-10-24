import Joi from 'joi';


export const registerVendorValidator = Joi.object({
    firstName: Joi.string().required().messages({
        'string.base': 'First name should be a type of text',
        'string.empty': 'First name cannot be an empty field',
        'any.required': 'First name is a required field'
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'Last name should be a type of text',
        'string.empty': 'Last name cannot be an empty field',
        'any.required': 'Last name is a required field'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is a required field'
    }),
    phone: Joi.string().required().messages({
        'string.base': 'Phone should be a type of text'
    }),
    location: Joi.string().required().messages({
        'string.base': 'Location should be a type of text',
        'string.empty': 'Location cannot be an empty field',
        'any.required': 'Location is a required field'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'any.required': 'Password is a required field'
    }),
    avatar: Joi.string().messages({
        'string.base': 'Avatar should be a type of text'
    })
});


export const loginVendorValidator = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is a required field'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be an empty field',
        'any.required': 'Password is a required field'
    })
});


export const updateProfileValidator = Joi.object({
    firstName: Joi.string().messages({
        'string.base': 'First name should be a type of text'
    }),
    lastName: Joi.string().messages({
        'string.base': 'Last name should be a type of text'
    }),
    phone: Joi.string().messages({
        'string.base': 'Phone should be a type of text'
    }),
    location: Joi.string().messages({
        'string.base': 'Location should be a type of text'
    }),
    avatar: Joi.string().messages({
        'string.base': 'Avatar should be a type of text'
    })
});