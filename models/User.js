const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        id: {type: String, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, unique: true},
        userType: { type: String, enum: ['company', 'normalUser'], default: 'normalUser' },
        location: {type: String, required: false},
        isAdmin: {type: Boolean, default: false},
        isAgent: {type: Boolean, default: false},
        skills: {type: Array, default: [], required: false},
        profile: {
            type: String, 
            required: true, 
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3hXyJV0WfQA_8UZWD2DJGM&ust=1707056999334000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMDrxdywj4QDFQAAAAAdAAAAABAE"
        },
        isEmailVerified: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false}
    }, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)