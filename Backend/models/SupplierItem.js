const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is the model for 'supplier items'
const SupplierItemSchema = new Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
        require: true
    },
    itemImg: {
        type: String,
        default: "buyershop/default.png"
    },
    tags: {
        type: [String]
    }
})

const SupplierItem = mongoose.model('supplieritem', SupplierItemSchema);
SupplierItem.createIndexes();
module.exports = SupplierItem;