const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if(!token) return res.status(401).json({ message: "Access denied" });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
