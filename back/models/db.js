import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/intranet', { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('connection etablit ')
        return mongoose.connection;
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}
