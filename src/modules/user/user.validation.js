import joi from 'joi';
import { isValidObjectId } from '../../middleware/validation.js';

export const signUpSchema = joi.object({
    name: joi.string().min(3).max(20).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be less than or equal to {#limit} characters long',
        'any.required': 'Name is required',
    }),
    phone: joi.string().required().messages({
        'string.base': 'Phone must be a string',
        'string.empty': 'Phone is required',
        'any.required': 'Phone is required',
    }),
    password: joi.string().required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
    }),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
        'string.base': 'Confirm Password must be a string',
        'string.empty': 'Confirm Password is required',
        'any.required': 'Confirm Password is required',
        'any.only': 'Confirm Password must match the Password',
    }),
    role: joi.string().valid('ADMIN', 'CLIENT', 'AGENT').required().messages({
        'string.base': 'Role must be a string',
        'string.empty': 'Role is required',
        'any.required': 'Role is required',
        'any.only': 'Role must be one of ADMIN, CLIENT, or AGENT',
    }),
}).required();

export const loginSchema = joi.object({
    phone: joi.string().required().messages({
        'string.base': 'Phone must be a string',
        'string.empty': 'Phone is required',
        'any.required': 'Phone is required',
    }),
    password: joi.string().required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
    }),
}).required();

export const deactivateUserSchema = joi.object({
    id: joi.string().custom(isValidObjectId).required().messages({
        'string.base': 'ID must be a string',
        'string.empty': 'ID is required',
        'any.required': 'ID is required',
        'any.invalid': 'Invalid ID',
    }),
}).required();