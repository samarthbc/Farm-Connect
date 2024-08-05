const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer')
const { body, validationResult, ExpressValidator } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchbuyer = require('../middleware/fetchbuyer');
const multer = require('multer')
const path = require('path')

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// Secret key
const JWT_SECRET = "ImBatman"

router.get('/', (req, res) => {
    res.json("This is Buyer Authentication route of FarmConnect...")
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
        let buyer = await Buyer.findOne({ email: req.body.email })
        if (buyer) {
            let success = false;
            return res.status(400).json({ error: "Email already exists" }, success);
        }

        // Hashing and adding salt to password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Creating the buyer
        let success = true;
        buyer = await Buyer.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });

        // JWT response
        const data = {
            buyer: {
                id: buyer.id
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
            const buyer = await Buyer.findOne({ email });

            if (!buyer) {
                return res.status(400).json({ error: "Incoreect username or password", success: false });
            }

            // To check if password matches
            let passcmp = null;
            passcmp = await bcrypt.compare(password, buyer.password)

            if (!passcmp) {
                return res.status(400).json({ error: "Incorrect username or password", success: false })
            }

            const data = {
                buyer: {
                    id: buyer.id
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
router.post('/update', fetchbuyer, async(req,res)=>{

    let buyerId = await req.buyer.id
    let buyer = await Buyer.findById(buyerId)
    Object.assign(buyer, req.body)
    await buyer.save()
    res.status(200).json({success:true})
})

// Fetch current buyer details
router.post('/fetchcurrent', fetchbuyer, async(req,res)=>{

    const buyerId = await req.buyer.id;
    const buyer = await Buyer.findById(buyerId);
    res.send(buyer);
})

// Editing buyer details
router.post('/buyeredit', fetchbuyer, async(req,res)=>{

    let buyerId = await req.buyer.id;
    let buyer = await Buyer.findById(buyerId);
    Object.assign(buyer,req.body);
    await buyer.save();
    res.status(200).json(buyer);
})

// Setting up a folder to store images using multer
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/buyerpfps")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// Uploading pfp
router.post('/pfp',upload.single('file'), fetchbuyer,async (req,res)=>{

    let buyerId = req.buyer.id
    const buyer = await Buyer.findById(buyerId)

    try{
        Object.assign(buyer,{profileimg:`buyerpfps/${req.file.filename}`})
        await buyer.save()
        res.status(200).json({success:true})
    } catch(error){
        res.status(500).json({error:"error"})
    }
})



module.exports = router