import mongoose from 'mongoose';
export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const DB_NAME = 'octofit_db';
export async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    return mongoose;
}
export default mongoose;
