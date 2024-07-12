import express from 'express';
import * as propertyController from './propertyRequest.controller.js';
import { isAuthenticated } from './../../middleware/authentication.middleware.js';
import { isAuthorized } from './../../middleware/authorization.middleware.js';
import { isValid } from '../../middleware/validation.js';
import { createPropertyRequestSchema, updatePropertyRequestSchema } from './propertyRequest.validation.js';

const propertyRouter = express.Router();
propertyRouter.use(isAuthenticated);

propertyRouter.post('/', isValid(createPropertyRequestSchema), isAuthorized("CLIENT", "ADMIN"), propertyController.createPropertyRequest);
propertyRouter.patch('/:id', isValid(updatePropertyRequestSchema), isAuthorized("CLIENT", "ADMIN"), propertyController.updatePropertyRequest);

export default propertyRouter;
