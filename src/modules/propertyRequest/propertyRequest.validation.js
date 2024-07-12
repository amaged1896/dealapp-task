import joi from 'joi';
import { isValidObjectId } from '../../middleware/validation.js';

export const createPropertyRequestSchema = joi.object({
    propertyType: joi.string().valid('VILLA', 'HOUSE', 'LAND', 'APARTMENT').required().messages({
        'string.base': 'Property Type must be a string',
        'string.empty': 'Property Type is required',
        'any.only': 'Property type must be either VILLA, HOUSE, LAND or APARTMENT'
    }),
    area: joi.number().required().messages({
        'number.base': 'Area must be a number',
        'number.empty': 'Area is required',
        'any.required': 'Area is required',
    }),
    price: joi.number().required().messages({
        'number.base': 'Price must be a number',
        'number.empty': 'Price is required',
        'any.required': 'Price is required',
    }),
    city: joi.string().required().messages({
        'string.base': 'City must be a string',
        'string.empty': 'City is required',
        'any.required': 'City is required',
    }),
    district: joi.string().required().messages({
        'string.base': 'District must be a string',
        'string.empty': 'District is required',
        'any.required': 'District is required',
    }),
    description: joi.string().required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description is required',
        'any.required': 'Description is required',
    }),
}).required();

export const updatePropertyRequestSchema = joi.object({
    description: joi.string().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description is required',
        'any.required': 'Description is required',
    }),
    area: joi.number().messages({
        'number.base': 'Area must be a number',
        'number.empty': 'Area is required',
        'any.required': 'Area is required',
    }),
    price: joi.number().messages({
        'number.base': 'Price must be a number',
        'number.empty': 'Price is required',
        'any.required': 'Price is required',
    }),
    id: joi.string().custom(isValidObjectId).required().messages({
        'string.base': 'Invalid ID',
        'string.empty': 'ID is required',
        'any.required': 'ID is required',
        'any.invalid': 'Invalid ID',
    }),
}).required();