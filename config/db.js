import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export default function dbConfig() {
    const db = process.env.MONGODB_URI;
    mongoose
        .connect(db)
        .then(() => console.log("MongoDB successfully connected"))
        .catch(err => console.log(err));
}