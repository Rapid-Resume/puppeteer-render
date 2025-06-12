const puppeteer = require('puppeteer');
require('dotenv').config();

const scrapeLogic = async (res) => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath: puppeteer.executablePath(),

    });

    try {

        const page = await browser.newPage();
        console.log('Browser launched and new page opened.');
        // Navigate the page to a URL.
        await page.goto('https://developer.chrome.com/');
        console.log('Navigated to the Chrome Developer site.');

        // Set screen size.
        await page.setViewport({ width: 1080, height: 1024 });
        console.log('Viewport set to 1080x1024.');

        // Type into search box using accessible input name.
        await page.locator('aria/Search').fill('automate beyond recorder');
        console.log('Search term "automate beyond recorder" entered.');

        // Wait and click on first result.
        await page.locator('.devsite-result-item-link').click();
        console.log('Clicked on the first search result.');

        // Locate the full title with a unique string.
        const textSelector = await page
            .locator('text/Customize and automate')
            .waitHandle();
        console.log('Located the text selector for the full title.');
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // Print the full title.
        console.log('The title of this blog post is "%s".', fullTitle);
        res.send(`The title of this blog post is "${fullTitle}".`);

    } catch (error) {
        console.error('An error occurred during scraping:', error);
        res.status(500).send('An error occurred while scraping the page.');
    }
    finally {
        // Close the browser.
        console.log('Closing the browser.');
        await browser.close();
    }
};

module.exports = { scrapeLogic };