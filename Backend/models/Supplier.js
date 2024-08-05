const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the model for 'supplier'
const SupplierSchema = new Schema({
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

const Supplier = mongoose.model('supplier', SupplierSchema);
Supplier.createIndexes();
module.exports = Supplier;