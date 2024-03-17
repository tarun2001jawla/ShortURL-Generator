const express = require('express');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const ejs = require('ejs');
const path = require('path');
const staticRoute = require("./routes/staticRouter");


const { connectMongoDB } = require('./connection');

const app = express();
const PORT = 8000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));

// Middleware

connectMongoDB('mongodb://127.0.0.1:27017/UrlDB');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.get("/test", async (req, res) => {
    
// });

// URL Route
app.use('/url', urlRoute);

// Get URL by short ID
app.get('/:shortid', async (req, res) => {
    try {
        const shortid = req.params.shortid;
        const entry = await URL.findOneAndUpdate(
            { shortId: shortid },
            {
                $push: {
                    visitLogs: {
                        timestamp: Date.now().toLocaleString(),
                    },
                },
            }
        );

        if (!entry) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error retrieving URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use("/",staticRoute);
// Start the server
app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});
