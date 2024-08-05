const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')

connectToMongo();
const app = express()
const port = 5000

// Enabling cors for all routes
app.use(cors())

// Setting up public as a static folder
app.use(express.static(path.join(__dirname,'public')))

// Available Routes are divided into seperate files for each cateory of routes
app.use('/api/supplierauth', require('./routes/supplierauth'))
app.use('/api/farmerauth', require('./routes/farmerauth'))
app.use('/api/buyerauth', require('./routes/buyerauth'))
app.use('/api/supplieritem', require('./routes/supplieritem'))
app.use('/api/farmeritem', require('./routes/farmeritem'))

// '/' of backend (testing purposes)
app.get("/",(req,res)=>{
    res.json("FarmConnect backend is Farming.... Let him cook...")
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})