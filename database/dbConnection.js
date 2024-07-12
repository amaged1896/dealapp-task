import mongoose from "mongoose";

export const connection = async () => {
    await mongoose.connect(process.env.LOCAL_DATABASE)
        .then(() => console.log('Database connection established successfully'))
        .catch((err) => console.log('Database connection failed', err.message));
}; 