const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    try {
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SEC);

            req.user = decodedToken;
            console.log('Decoded Token:', decodedToken);
            next();
        } else {
            return res.status(401).json({ error: 'You are not authenticated' });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json('Invalid token');
    }
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
            res.status(403).json({ error: 'You are restricted from performing this operation' });
        }
    });
};

module.exports = {verifyToken, verifyAndAuthorization, verifyAndAdmin};
