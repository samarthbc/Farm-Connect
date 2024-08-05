const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the model for 'farmer'
const FarmerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    location:{
        type: String,
        // required: true
    },
    address:{
        type: String,
    },
    phno:{
        type:Number,
    },
    profileimg:{
        type: String,
        default: "pfp_blank.png"
    }
});

const Farmer = mongoose.model('farmer', FarmerSchema);
Farmer.createIndexes();
module.exports = Farmer;