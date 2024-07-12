import Ad from "../../../database/models/ads.model.js";
import PropertyRequest from "../../../database/models/propertyRequest.model.js";
import User from "../../../database/models/user.model.js";
import { AppError } from "../../../utils/appError.js";
import { catchAsync } from "../../../utils/catchAsync.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = catchAsync(async (req, res, next) => {
    const { name, password, phone, role } = req.body;
    const isExist = await User.findOne({ phone });
    if (isExist) return next(new AppError("User already registered", 409));
    const hashedPassword = await bcryptjs.hash(password, Number(process.env.SALT_ROUND));

    const user = await User.create({ name, phone, password: hashedPassword, role });

    return res.status(201).json({ status: "success", results: user });
});


export const login = catchAsync(async (req, res, next) => {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone }).select("+password");
    if (!user) return next(new AppError("User not found!", 404));
    if (user.status === "DELETED") return next(new AppError("User is deactivated!", 400));

    const match = await bcryptjs.compare(password, user.password);
    if (!match) return next(new AppError("Invalid password", 400));

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role, phone: user.phone, status: user.status },
        process.env.TOKEN_KEY,
        { expiresIn: '2d' });
    await user.save();

    return res.status(200).json({ status: "success", token: token });
});

export const deactivateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: "DELETED" }, { new: true });
    if (!user) return next(new AppError("User not found!", 404));
    return res.status(200).json({ status: "success", data: user });
});

export const getMyAdsOrRequests = catchAsync(async (req, res, next) => {
    const user = req.user._id;
    const { role } = req.user;
    if (role === "AGENT") {
        const ads = await Ad.find({ user });

        return res.status(200).json({ status: "success", data: ads });
    } else if (role === "CLIENT") {
        const propertyRequests = await PropertyRequest.find({ user });

        return res.status(200).json({ status: "success", data: propertyRequests });
    } else if (role === "ADMIN") {
        const ads = await Ad.find({ user });
        const propertyRequests = await PropertyRequest.find({ user });
        return res.status(200).json({ status: "success", data: { ads, propertyRequests } });
    }
    return next(new AppError("You are not authorized to access this route", 403));
});