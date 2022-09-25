const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://Toddle-Backend:d0LAXpICn1rG5H8d@cluster0.fvkctbr.mongodb.net/test", {
            useNewUrlParser: true
        });
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit();
    }
}
module.exports = connectDB;