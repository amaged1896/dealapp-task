import joi from 'joi';

export const createAdSchema = joi.object({
    propertyType: joi.string().valid('VILLA', 'HOUSE', 'LAND', 'APARTMENT').required().messages({
        'string.base': 'Property type must be a string',
        'string.empty': 'Property type is required',
        'any.required': 'Property type is required',
        'any.only': 'Property type must be either VILLA, HOUSE, LAND or APARTMENT'
    }),
    area: joi.number().required().messages({
        'number.base': 'Area must be a number',
        'number.empty': 'Area is required',
        'any.required': 'Area is required'
    }),
    price: joi.number().required().messages({
        'number.base': 'Price must be a number',
        'number.empty': 'Price is required',
        'any.required': 'Price is required'
    }),
    city: joi.string().required().messages({
        'string.base': 'City must be a string',
        'string.empty': 'City is required',
        'any.required': 'City is required'
    }),
    district: joi.string().required().messages({
        'string.base': 'District must be a string',
        'string.empty': 'District is required',
        'any.required': 'District is required'
    }),
    description: joi.string().required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
}).options({ abortEarly: false }).required();
