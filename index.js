const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://ytmuzic.netlify.app'
}));
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("hello working")
})

app.post('/convert', async (req, res) => {
    const videoUrl = req.body.url;
    if (!videoUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const options = {
        method: 'GET',
        url: process.env.API_URL,
        params: {
            url: videoUrl,
            quality: '192'
        },
        headers: {
            'x-rapidapi-key': '2bc6463482mshda856378a9d6b35p178a9ejsn9f1ee30cb80b',
            'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json({link:response.data.dlink});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch MP3 URL' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
