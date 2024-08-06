const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier')
const { body, validationResult, ExpressValidator } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchsupplier = require('../middleware/fetchsupplier');
const multer = require('multer')
const path = require('path')

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// Secret key
const JWT_SECRET = "ImBatman"

router.get('/', (req, res) => {
    res.json("This is Supplier Authentication route of FarmConnect...")
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
        let supplier = await Supplier.findOne({ email: req.body.email })
        if (supplier) {
            let success = false;
            return res.status(400).json({ error: "Email already exists" }, success);
        }

        // Hashing and adding salt to password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Creating the supplier
        let success = true;
        supplier = await Supplier.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            location: req.body.location
        });

        // JWT response
        const data = {
            supplier: {
                id: supplier.id
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
            const supplier = await Supplier.findOne({ email });

            if (!supplier) {
                return res.status(400).json({ error: "Incoreect username or password", success: false });
            }

            // To check if password matches
            let passcmp = null;
            passcmp = await bcrypt.compare(password, supplier.password)

            if (!passcmp) {
                return res.status(400).json({ error: "Incorrect username or password", success: false })
            }

            const data = {
                supplier: {
                    id: supplier.id
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
router.post('/update', fetchsupplier, async(req,res)=>{

    let supplierId = await req.supplier.id
    let supplier = await Supplier.findById(supplierId)
    Object.assign(supplier, req.body)
    await supplier.save()
    res.status(200).json({success:true})
})

// Fetching the current Supplier
router.post('/fetchcurrent', fetchsupplier, async (req, res) => {

    let supplierId = await req.supplier.id
    let supplier = await Supplier.findById(supplierId)
    res.send(supplier)
})

// Setting up a folder to store images using multer
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/supplierpfps")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// Uploading pfp
router.post('/pfp',upload.single('file'), fetchsupplier,async (req,res)=>{

    let supplierId = req.supplier.id
    const supplier = await Supplier.findById(supplierId)

    try{
        Object.assign(supplier,{profileimg:`supplierpfps/${req.file.filename}`})
        await supplier.save()
        res.status(200).json({success:true})
    } catch(error){
        res.status(500).json({error:"error"})
    }
})

// Get by id
router.post('/getbyid',async(req,res)=>{
    const {id} = req.body;
    const supplier = await Supplier.findById(id)

    return res.json(supplier)
})

module.exports = router