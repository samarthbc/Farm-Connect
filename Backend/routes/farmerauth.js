const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer')
const { body, validationResult, ExpressValidator } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchfarmer = require('../middleware/fetchfarmer');
const multer = require('multer')
const path = require('path')

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// Secret key
const JWT_SECRET = "ImBatman"

router.get('/', (req, res) => {
    res.json("This is Farmer Authentication route of FarmConnect...")
})

// Signup
router.post('/create',

    // For express validator
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ],

    async (req, res) => {

        // To check for input errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let success = false;
            return res.status(400).json({ errors: errors.array(), success });
        }

        // To check if the account already exists
        let farmer = await Farmer.findOne({ email: req.body.email })
        if (farmer) {
            let success = false;
            return res.status(400).json({ error: "Email already exists" }, success);
        }

        // Hashing and adding salt to password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Creating the farmer
        let success = true;
        farmer = await Farmer.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });

        // JWT response
        const data = {
            farmer: {
                id: farmer.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ authToken, success });

    }
)

// Login
router.post('/login',

    // Express Validator
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password should not be empty').exists()
    ],

    async (req, res) => {
        try {
            // To check input errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let success = false;
                return res.status(400).json({ errors: errors.array(), success });
            }

            // To check if the given email exists
            const { email, password } = req.body;
            const farmer = await Farmer.findOne({ email });

            if (!farmer) {
                return res.status(400).json({ error: "Incoreect username or password", success: false });
            }

            // To check if password matches
            let passcmp = null;
            passcmp = await bcrypt.compare(password, farmer.password)

            if (!passcmp) {
                return res.status(400).json({ error: "Incorrect username or password", success: false })
            }

            const data = {
                farmer: {
                    id: farmer.id
                }
            };

            // Sending JWT token response
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.json({ authToken, success: true })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", success: false })
        }
    }
)


// Updating user profile
router.post('/update', fetchfarmer, async (req, res) => {

    let farmerId = await req.farmer.id
    let farmer = await Farmer.findById(farmerId)
    Object.assign(farmer, req.body)
    await farmer.save()
    res.status(200).json({ success: true })
})

// Fetching the current Farmer
router.post('/fetchcurrent', fetchfarmer, async (req, res) => {

    let farmerId = await req.farmer.id
    let farmer = await Farmer.findById(farmerId)
    res.send(farmer)
})

// Editing farmer details
router.post('/farmeredit', fetchfarmer, async (req, res) => {

    let farmerId = await req.farmer.id;
    let farmer = await Farmer.findById(farmerId);
    Object.assign(farmer, req.body);
    await farmer.save();
    res.status(200).json(farmer);
})

// Setting up a folder to store images using multer
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/farmerpfps")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// Uploading pfp
router.post('/pfp',upload.single('file'), fetchfarmer,async (req,res)=>{

    let farmerId = req.farmer.id
    const farmer = await Farmer.findById(farmerId)

    try{
        Object.assign(farmer,{profileimg:`farmerpfps/${req.file.filename}`})
        await farmer.save()
        res.status(200).json({success:true})
    } catch(error){
        res.status(500).json({error:"error"})
    }
})

// Get by id
router.post('/getbyid',async(req,res)=>{
    const {id} = req.body
    const farmer = await Farmer.findById(id)

    return res.json(farmer)
})

module.exports = router