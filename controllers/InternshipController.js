const Internship = require("../models/Internship")

module.exports = {
    createInternship: async (req, res) => {
        const newInternship = new Internship(req.body);

        try {
            const savedInternship = await newInternship.save();
            const {__v, createdAt, ...newInternshipInfo} = savedInternship._doc;

            res.status(201).json(newInternshipInfo);
        } catch(error){
            res.status(500).json(error);
        }
    },

    updateInternship : async (req, res) => {
        try {
            const updatedInternship = await Internship.findByIdAndUpdate(
                req.params.id, 
                {$set: req.body}, 
                {new: true});

                const {__v, createdAt, updatedAt, ...updateInternshipInfo} = updatedInternship._doc;

                res.status(200).json(updateInternshipInfo);

        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteInternship : async (req, res) => {
        try {
            await Internship.findByIdAndDelete(req.params.id);
                res.status(200).json("Internship successfully deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getInternship: async (req, res) => {
        try {
            const internship = await Internship.findById(req.params.id)
            const { __v, ...internshipInfo } = internship._doc;
            res.status(200).json(internshipInfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllInternships: async (req, res) => {
        try {
            const internships = await Internship.find()
            res.status(200).json(internships);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    searchInternships: async (req, res) => {
        try {
            const results = await Internship.aggregate(
                [{
                    $search: {
                        index: "internshipsearch",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }]
            )
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}