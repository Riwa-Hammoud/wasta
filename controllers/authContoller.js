const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {
        const salt = bcrypt.genSaltSync(10);
        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt).toString(),
            skills: req.body.skills
        });

        try {
            const savedUser = await newUser.save();

            res.status(201).json(savedUser)
            
        } catch (error) {
            res.status(500).json(error)
        }

    },

    //login function
    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(401).json("Wrong Login Details");

            const validPassword = bcrypt.compareSync(req.body.password, user.password); // Changed 'req.body.pass' to 'req.body.password'
            if(!validPassword) return res.status(401).json("Wrong Password");

            const { password, __v, createdAt, ...others } = user._doc;

            const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.SECRET, {expiresIn: '1h',});
            res.status(200).json({ others, token });
        } catch (error) {
            res.status(500).json(error)
        }
    }
}