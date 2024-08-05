const express = require('express');
const router = express.Router();
const SupplierItem = require('../models/SupplierItem')
const Supplier = require('../models/Supplier')
const fetchsupplier = require('../middleware/fetchsupplier')
const multer = require('multer')
const path = require('path')

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// To create a new item
router.post('/create', fetchsupplier, async (req, res) => {

    let supplierId = req.supplier.id;
    const { name, description, manuDate, mrp, sp } = req.body
    const item = new SupplierItem({ supplier: supplierId, name, description, manuDate, mrp, sp })
    await item.save();
    return res.json(item)
})

// Fetching all items based on supplier's location
router.post('/getatlocation', async (req, res) => {

    let { location } = req.body;
    let suppliersAtLocation = await Supplier.find({ location: location });
    let supplierIds = suppliersAtLocation.map(supplier => supplier._id)

    let itemsAtLocation = await SupplierItem.find({ supplier: { $in: supplierIds } });

    return res.json(itemsAtLocation);
})

// Fetching all other items other than given location
router.post('/getotherlocation', async (req, res) => {

    let { location } = req.body;
    console.log(location);
    let suppliersAtLocation = await Supplier.find({ location: location });
    let supplierIds = suppliersAtLocation.map(supplier => supplier._id)

    let itemsNotAtLocation = await SupplierItem.find({ supplier: { $nin: supplierIds } });

    return res.json(itemsNotAtLocation);
})

// Fetching all items based on its name (Search bar)
router.post('/getbyname', async (req, res) => {

    let { search } = req.body;
    const regexPattern = new RegExp('^' + search, 'i');
    const items = await SupplierItem.find({ name: regexPattern });

    return res.json(items);
})

// Itemimg
// Setting up multer folder
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/farmershop")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/updateimg/:id', upload.single('file'), async (req, res) => {

    let itemId = req.params.id;
    try {
        let item = await SupplierItem.findById(itemId)
        Object.assign(item, { itemImg: `farmershop/${req.file.filename}` })
        await item.save()
        res.status(200).json({ "success": true })
    } catch (error) {
        res.status(500).json({ "error": error })
        console.log(error)
    }
})

// Fetching all items of particular supplier
router.post('/getofsupplier', fetchsupplier, async(req,res)=>{

    let supplierId = req.supplier.id;
    let items = await SupplierItem.find({supplier:supplierId});
    return res.json(items);
})

// Get single item by id
router.post('/getone',async(req,res)=>{
    let itemId = req.body.id
    let reqitem = await SupplierItem.findById(itemId)
    res.status(200).json(reqitem)
})

// Get location
router.post('/getById',async(req,res)=>{
    let itemId = req.body.id;
    let reqitem = await SupplierItem.findById(itemId)
    let supplier = await Supplier.findById(reqitem.supplier)
    let location = supplier.location
    return res.json({location:location})
})


module.exports = router