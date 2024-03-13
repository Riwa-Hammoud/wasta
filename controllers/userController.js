const User = require("../models/User");
const bcrypt = require('bcryptjs');

const saltRounds = 10; // Set an appropriate number of salt rounds for bcrypt

module.exports = {
    updateUser: async (req, res) => {
        try {
            console.log('User ID in updateUser controller:', req.params.id);
            // Check if the request body contains a password field
            if (req.body.password) {

                // Hash the password using bcrypt before updating
                req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
            }
            // Use findByIdAndUpdate to update the user and get the updated document
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Extract sensitive information from the updated user document
            const { password, __v, createdAt, ...others } = updatedUser._doc;

            // Respond with the updated user details (excluding sensitive information)
            res.status(200).json({ ...others });
        } catch (error) {
            console.error('Error updating user: ',error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    //delete function

    deleteUser: async (req,res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Successfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getUser: async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            const {password, __v, createdAt, updatedAt, ...userData} = user._doc;
            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAllUsers: async (req,res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json(error)
        }
    },

};
