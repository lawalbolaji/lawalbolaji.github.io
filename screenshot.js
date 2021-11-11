const puppeteer = require('puppeteer');

const url = "https://lawalbolaji.github.io";

const run = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 1280,
        height: 800
    });

    await page.goto(url);
    await page.screenshot({
        path: "pageShot.png",
        fullPage: true
    });

    await browser.close()
};

run();