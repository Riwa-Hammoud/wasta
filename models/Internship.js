const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        location: {type: String, required: true},
        company: {type: String, required: true},
        salary: {type: String, required: false},
        period: {type: String, required: true},
        contract: {type: String, required: true},
        requirements: {type: Array, required: true},
        imageUrl: {type: String, required: false, default: ""},
        agentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            requied: true,
        }
    }, {timestamps: true}
);

module.exports = mongoose.model("Internship", InternshipSchema)