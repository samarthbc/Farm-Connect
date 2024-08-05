const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/FarmConnect?";

// const mongoURL = "mongodb://192.168.0.106:27017/FarmConnect?"; //IP address

const connectToMongo = () => {
    mongoose.connect(mongoURL)
};

module.exports = connectToMongo;
