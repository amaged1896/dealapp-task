import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };
import adsRouter from './src/modules/ads/ads.routes.js';
import propertyRouter from './src/modules/propertyRequest/propertyRequest.routes.js';
import { AppError } from './utils/appError.js';
import globalErrorHandler from './utils/errorController.js';
import authRouter from './src/modules/user/user.routes.js';

export const bootstrap = async (app, express) => {
    app.use(express.json());

    // Swagger setup
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // user
    app.use('/api/v1/user', authRouter);

    // property requests
    app.use('/api/v1/propertyRequests', propertyRouter);

    // ads
    app.use('/api/v1/ads', adsRouter);

    // not found page router
    app.all("*", (req, res, next) => {
        return next(new AppError('Page not found', 404));
    });

    // global error handling middleware
    app.use(globalErrorHandler);
};
