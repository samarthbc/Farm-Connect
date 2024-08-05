const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the model for 'buyer'
const BuyerSchema = new Schema({
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
    profileimg:{
        type: String,
        default: "pfp_blank.png"
    }
});

const Buyer = mongoose.model('buyer', BuyerSchema);
Buyer.createIndexes();
module.exports = Buyer;