import cron from 'node-cron';
import PropertyRequest from "../database/models/propertyRequest.model.js";
import { catchAsync } from './catchAsync.js';

const refreshPropertyRequests = catchAsync(async () => {
    const currentDate = new Date();
    await PropertyRequest.updateMany({}, { refreshedAt: currentDate });
    console.log('Property requests refreshed at', currentDate);
});


cron.schedule('0 0 */3 * *', () => {
    console.log('Running cron job to refresh property requests');
    refreshPropertyRequests();
});

// Schedule the cron job to run every 3 seconds (JUST FOR TESTING PURPOSES)
// cron.schedule('*/3 * * * * *', () => {
//     console.log('Running cron job every 3 seconds');
//     refreshPropertyRequests();
// });

export default refreshPropertyRequests;