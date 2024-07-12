import PropertyRequest from "../../../database/models/propertyRequest.model.js";
import User from "../../../database/models/user.model.js";
import { AppError } from "../../../utils/appError.js";
import { catchAsync } from "../../../utils/catchAsync.js";


export const createPropertyRequest = catchAsync(async (req, res, next) => {
    const { propertyType, area, price, city, district, description } = req.body;
    const user = req.user._id;

    const isExist = await User.findById(user);
    if (!isExist) return next(new AppError("User not found!", 404));
    if (isExist.status !== "ACTIVE") return next(new AppError("User is not active!", 400));

    const propertyRequest = await PropertyRequest.create({ propertyType, area, price, city, district, description, user });
    return res.status(201).json({ status: "success", data: propertyRequest });
});


export const updatePropertyRequest = catchAsync(async (req, res, next) => {
    const { description, area, price } = req.body;
    const { id } = req.params;
    const user = req.user._id;

    const isExist = await User.findById(user);
    if (!isExist) return next(new AppError("User not found!", 404));
    if (isExist.status !== "ACTIVE") return next(new AppError("User is not active!", 400));

    const propertyRequest = await PropertyRequest.findByIdAndUpdate(id, { description, area, price }, { new: true });
    if (!propertyRequest) return next(new AppError("Property Request not found!", 404));
    return res.status(200).json({ status: "success", data: propertyRequest });
});