const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    createUser: async (req, res) => {
        try {
            if (!req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json({ message: "Missing required fields" });
            }    
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
    
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            if (error.code === 11000) { // Duplicate key error
                res.status(400).json({ message: "Username or email already exists" });
            } else {
                res.status(500).json({ message: "An error occurred", error: error });
            }
        }
    },

    //login function
    // loginUser: async (req, res) => {
    //     try{
    //         const user = await User.findOne({ email: req.body.email });
    //         !user && res.status(401).json("Wrong Login Details");

    //         const validPassword = bcrypt.compareSync(req.body.password, user.password); // Changed 'req.body.pass' to 'req.body.password'
    //         if(!validPassword) return res.status(401).json("Wrong Password");

    //         const { password, __v, createdAt, ...others } = user._doc;

    //         const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.SECRET, {expiresIn: '1h',});
    //         res.status(200).json({ others, token });
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
    // }

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(401).json("Wrong Login Details");
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json("Wrong Password");
            }

            const { password, __v, createdAt,...others } = user._doc;

            // Include userType in the JWT payload
            const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin, isAgent: user.isAgent }, process.env.SECRET, { expiresIn: '1h' });
            res.status(200).json({...others, token }); // Use spread operator to include other properties
        } catch (error) {
            res.status(500).json(error);
        }
    }
}