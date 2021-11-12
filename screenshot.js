const puppeteer = require('puppeteer');

module.exports = {
    async screenshot(url, path = "pageShot.png"){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        await page.setViewport({
            width: 1280,
            height: 800
        });
    
        await page.goto(url);
        await page.screenshot({
            path: path,
            fullPage: true
        });
    
        await browser.close()
    }
}