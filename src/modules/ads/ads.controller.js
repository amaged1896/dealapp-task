import Ad from "../../../database/models/ads.model.js";
import PropertyRequest from "../../../database/models/propertyRequest.model.js";
import User from "../../../database/models/user.model.js";
import { AppError } from "../../../utils/appError.js";
import { catchAsync } from "../../../utils/catchAsync.js";

export const createAdvertisement = catchAsync(async (req, res, next) => {
    const { propertyType, area, price, city, district, description } = req.body;
    const user = req.user._id;

    const isUserActive = await User.findOne({ _id: user, status: "ACTIVE" });
    if (!isUserActive) return next(AppError("User is not active", 400));

    const ad = await Ad.create({ propertyType, area, price, city, district, description, user });

    return res.status(201).json({ status: "success", data: ad });
});


export const matchPropertyRequests = catchAsync(async (req, res, next) => {
    const adId = req.params.id;

    const ad = await Ad.findById(adId);
    if (!ad) {
        return next(new AppError("Ad not found", 404));
    }

    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 10;

    const priceTolerance = ad.price * 0.1;

    const minPrice = ad.price - priceTolerance;
    const maxPrice = ad.price + priceTolerance;

    const result = await PropertyRequest.aggregate([
        {
            $match: {
                district: ad.district.toLowerCase(),
                price: { $gte: minPrice, $lte: maxPrice },
                area: { $gte: ad.area }
            }
        },
        {
            $facet: {

                metadata: [{ $count: "total" }, { $addFields: { page: page, limit: limit } }],
                data: [
                    { $sort: { refreshedAt: -1 } },
                    { $skip: (page - 1) * limit },
                    { $limit: limit }
                ]
            }
        },
        {
            $unwind: "$metadata"
        },
        {
            $project: {
                total: "$metadata.total",
                page: "$metadata.page",
                limit: "$metadata.limit",
                data: "$data"
            }
        }
    ]);

    console.log("result", result);

    const total = result[0]?.total || 0;
    const hasNextPage = page < Math.ceil(total / limit);
    const hasPreviousPage = page > 1;

    return res.status(200).json({
        status: "success",
        data: result[0]?.data || [],
        page,
        limit,
        total,
        hasNextPage,
        hasPreviousPage
    });
});


export const getUserStatistics = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const userStatistics = await User.aggregate([
        {
            $match: {
                $or: [{ role: "CLIENT" }, { role: "AGENT" }]
            }
        },
        {
            $lookup: {
                from: "ads",
                localField: "_id",
                foreignField: "user",
                as: "ads"
            }
        },
        {
            $lookup: {
                from: "propertyrequests",
                localField: "_id",
                foreignField: "user",
                as: "requests"
            }
        },
        {
            $project: {
                name: 1,
                role: 1,
                phone: 1,
                status: 1,
                adsCount: { $size: "$ads" },
                totalAdsAmount: { $sum: "$ads.price" },
                requestsCount: { $size: "$requests" },
                totalRequestsAmount: { $sum: "$requests.price" }
            }
        }
    ]);

    const totalUsers = userStatistics.length;
    const total = Math.ceil(totalUsers / limit);
    const hasNextPage = page < total;
    const hasPreviousPage = page > 1;

    const paginatedUserStatistics = userStatistics.slice(skip, skip + limit);

    return res.status(200).json({
        data: paginatedUserStatistics,
        page,
        limit,
        total: totalUsers,
        hasNextPage,
        hasPreviousPage
    });
});
