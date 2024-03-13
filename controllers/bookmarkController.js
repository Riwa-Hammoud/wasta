const Bookmark = require("../models/Bookmark")

module.exports = {
    createBookmark: async (req, res) => {
        const requiredFields = ["location", "company", "imageUrl", "title", "userId", "job"];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        const newBook = new Bookmark(req.body);

        try {
            const savedBookmark = await newBook.save();
            res.status(201).json("Bookmark Successfully created");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteBookmark: async (req, res) => {
        try{
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(200).json("Bookmark Successfully Deleted");
        } catch(error){
            res.status(500).json(error);
        }
    },

    getBookmarks: async (req, res) => {
        try{
            const bookmarks = await Bookmark.find({ userId: req.params.userId });
            res.status(200).json(bookmarks);
        } catch(error){
            res.status(500).json(error);
        }
    },


}