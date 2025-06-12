const express = require('express');
const { scrapeLogic } = require('./scrapeLogic');
const app = express();

const port = process.env.PORT || 4000;

app.get('/scrape', (req, res) => {
    scrapeLogic(res);
}
);

app.get('/', (req, res) => {
    res.send('Render puppeteer is running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});