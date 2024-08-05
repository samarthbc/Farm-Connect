const jwt = require('jsonwebtoken')

const JWT_SECRET = "ImBatman";

const fetchsupplier = (req,res,next) =>{
    let success = false

    // Fetching the supplier from auth-token
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).send({error:"Authenticate using a valid token", success});
    }

    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.supplier = data.supplier;
        next();
    }catch(error){
        return res.status(401).json({error:error});
    }
}

module.exports = fetchsupplier;