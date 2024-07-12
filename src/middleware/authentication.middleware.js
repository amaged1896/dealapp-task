
import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/appError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import User from '../../database/models/user.model.js';

export const isAuthenticated = catchAsync(async (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token || !token.startsWith(process.env.BEARER_KEY)) {
        return next(new AppError("Valid token is required!", 401));
    }

    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (!decoded) return next(new AppError("Invalid token!"));

    const user = await User.findOne({ phone: decoded.phone });
    if (!user) return next(new AppError("user not found!"));

    req.user = user;
    return next();
});