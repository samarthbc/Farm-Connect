const express = require('express');
const router = express.Router();
const FarmerItem = require('../models/FarmerItem')
const Farmer = require('../models/Farmer')
const fetchfarmer = require('../middleware/fetchfarmer')
const multer = require('multer')
const path = require('path')

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// To create a new item
router.post('/create', fetchfarmer, async (req, res) => {

    let farmerId = req.farmer.id;
    const { name, description, manuDate, mrp, sp } = req.body
    const item = new FarmerItem({ farmer: farmerId, name, description, manuDate, mrp, sp })
    await item.save();
    return res.json(item)
})

// Fetching all items based on farmer's location
router.post('/getatlocation', async (req, res) => {
    const { location } = req.body;
    let farmersAtLocation = await Farmer.find({ location: location });  // Farmers -> Farmer Ids -> Farmeritems
    let farmerIds = farmersAtLocation.map(farmer => farmer._id);

    let itemsAtLocation = await FarmerItem.find({ farmer: { $in: farmerIds } });

    return res.json(itemsAtLocation);
})

// Fetching all items other than at farmer's location
router.post('/getotherlocation', async (req, res) => {
    const { location } = req.body;
    let farmersAtLocation = await Farmer.find({ location: location });
    let farmerIds = farmersAtLocation.map(farmer => farmer._id);

    let itemsAtLocation = await FarmerItem.find({ farmer: { $nin: farmerIds } });

    return res.json(itemsAtLocation);
})

// Search bar implimentation
router.post('/getbyname', async (req, res) => {

    let { search } = req.body;
    const regexPattern = new RegExp('^' + search, 'i');
    const items = await FarmerItem.find({ name: regexPattern });

    return res.json(items);
})

// Itemimg
// Setting up multer folder
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/buyershop")
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
        let item = await FarmerItem.findById(itemId)
        Object.assign(item, { itemImg: `buyershop/${req.file.filename}` })
        await item.save()
        res.status(200).json({ "success": true })
    } catch (error) {
        res.status(500).json({ "error": error })
        console.log(error)
    }
})

// Fetching all items of particular farmer
router.post('/getoffarmer', fetchfarmer, async(req,res)=>{

    let farmerId = req.farmer.id;
    let items = await FarmerItem.find({farmer:farmerId});
    return res.json(items);
})

// Get single item by id
router.post('/getone',async(req,res)=>{
    let itemId = req.body.id
    let reqitem = await FarmerItem.findById(itemId)
    res.status(200).json(reqitem)
})

// Get location
router.post('/getById',async(req,res)=>{
    let itemId = req.body.id;
    let reqitem = await FarmerItem.findById(itemId)
    let farmer = await Farmer.findById(reqitem.farmer)
    let location = farmer.location
    return res.json({location:location})
})


module.exports = router