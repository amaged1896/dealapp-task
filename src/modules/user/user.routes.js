import express from 'express';
import * as authControllers from './user.controller.js';
import { deactivateUserSchema, loginSchema, signUpSchema } from './user.validation.js';
import { isValid } from '../../middleware/validation.js';
import { isAuthorized } from '../../middleware/authorization.middleware.js';
import { isAuthenticated } from '../../middleware/authentication.middleware.js';
const authRouter = express.Router();

authRouter.post('/signup', isValid(signUpSchema), authControllers.signup);
authRouter.post('/login', isValid(loginSchema), authControllers.login);
authRouter.patch('/deactivate/:id', isAuthenticated, isValid(deactivateUserSchema), isAuthorized("ADMIN"), authControllers.deactivateUser);
authRouter.get('/my-ads-requests', isAuthenticated, isAuthorized("CLIENT", "AGENT", "ADMIN"), authControllers.getMyAdsOrRequests);

export default authRouter;