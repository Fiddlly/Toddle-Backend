const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/toodle", {
            useNewUrlParser: true
        });
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit();
    }
}
module.exports = connectDB;