const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SEC);

            req.user = decodedToken;
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
