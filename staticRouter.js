const express = require("express");
const URL = require('../models/url');
const router = express.Router();




router.get("/", async (req, res) => {
    try {
        // Fetch all URLs from the database
        const urls = await URL.find({});

        // Render the 'home.ejs' template with the 'urls' data
        res.render('home', { urls: urls });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;