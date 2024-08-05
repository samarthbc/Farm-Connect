const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the model for 'farmer items'
const FarmerItemSchema = new Schema({
    farmer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    manuDate: {
        type: Date,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    sp: {
        type: Number,
        required: true
    },
    itemImg: {
        type: String,
        default: "buyershop/default.png"
    },
    tags: {
        type: [String]
    }
})

const FarmerItem = mongoose.model('farmeritem', FarmerItemSchema);
FarmerItem.createIndexes();
module.exports = FarmerItem;