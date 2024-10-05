const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_URL;

const dbConnection = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = dbConnection;
