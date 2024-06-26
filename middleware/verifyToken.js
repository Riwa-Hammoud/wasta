const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log('Attempting to verify token...');
    const authHeader = req.headers.authorization;
    console.log('Received Auth Header:', authHeader);
    if (!authHeader ||!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided.' });
    }
    const token = authHeader.split(' ')[1].trim();
    console.log('Token:', token);
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ error: 'Invalid token.' });
        }
        console.log('Decoded Token:', decoded); // Log the decoded token to inspect its content
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

        // Check if the user has the required role
        if (req.user.isAgent) {
            console.log('User is a company agent');
            next();
        } else {
            console.log('Access restriction error: User does not have the required role');
            res.status(403).json({ error: 'You are restricted from performing this operation, you should be a company' });
        }
    });
};


module.exports = {verifyToken, verifyAndAuthorization, verifyAndAdmin, verifyAndAgent};
