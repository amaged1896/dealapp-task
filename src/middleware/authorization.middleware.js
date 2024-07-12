import { AppError } from '../../utils/appError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const isAuthorized = (...roles) => {
    return catchAsync(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You are not authorized", 401));
        }
        return next();
    });
};
