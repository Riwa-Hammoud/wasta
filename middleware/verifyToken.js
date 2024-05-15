const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log('Attempting to verify token...');
    const authHeader = req.headers.authorization;
    console.log('Received Auth Header:', authHeader);
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided.' });
    }
    const token = authHeader.split(' ')[1]; // Bearer <token>
    console.log('Token:', token);
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = decoded;
        next();
    });
};



const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('Token verified successfully');
        console.log('Request user ID:', req.user.userId); // Update this line to use "userId"
        console.log('URL parameter user ID:', req.params.id);
        
        if (req.user.userId === req.params.id) {
            next();
        } else {
            console.log('Access restriction error: User ID mismatch');
            res.status(403).json({ error: 'You are restricted from performing this operation' });
        }
    });
};

const verifyAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('Token verified successfully');
        console.log('Decoded Token:', req.user);

        // Assuming isAdmin is a property in the user object
        if (req.user.isAdmin) {
            console.log('User is an admin');
            next();
        } else {
            console.log('Access restriction error: User is not an admin');
            res.status(403).json({ error: 'You are restricted from performing this operation,you should be an admin' });
        }
    });
};

const verifyAndAgent = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('Token verified successfully');
        console.log('Decoded Token:', req.user);

        // Assuming isAgent is a property in the user object
        if (req.user.isAgent) {
            console.log('User is a company');
            next();
        } else {
            console.log('Access restriction error: User is not a company agent');
            res.status(403).json({ error: 'You are restricted from performing this operation, you should be a company' });
        }
    });
};

function checkUserType(requiredType) {
    return (req, res, next) => {
        const userType = req.user.userType;
        if (userType === requiredType) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
        };
    }

module.exports = {verifyToken, verifyAndAuthorization, verifyAndAdmin, checkUserType, verifyAndAgent};
