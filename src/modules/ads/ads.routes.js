import express from 'express';
import { isAuthenticated } from './../../middleware/authentication.middleware.js';
import { createAdvertisement, getUserStatistics, matchPropertyRequests } from './ads.controller.js';
import { isAuthorized } from './../../middleware/authorization.middleware.js';
import { isValid } from '../../middleware/validation.js';
import { createAdSchema } from './ads.validation.js';
const adsRouter = express.Router();

adsRouter.use(isAuthenticated);

adsRouter.get('/statistics', isAuthorized("ADMIN"), getUserStatistics);
adsRouter.post('/', isValid(createAdSchema), isAuthorized("AGENT", "ADMIN"), createAdvertisement);
adsRouter.get('/match/:id', matchPropertyRequests);

export default adsRouter;