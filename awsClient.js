// load node env variables
require('dotenv').config();

// load command line args from actions/core
const core = require('@actions/core');

// load awsC s3Client and PutBoject Command
const { S3Client } = require('@aws-sdk/client-s3');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

// configure aws s3 client
const REGION = process.env['AWS_DEFAULT_REGION'] || 'us-east-2';
const AWS_ACCESS_KEY_ID = process.env['AWS_ACCESS_KEY_ID'] || core.getInput('access-key-id'); // if no access to environment varibales, get from github actions inputs
const AWS_SECRET_ACCESS_KEY = process.env['AWS_SECRET_ACCESS_KEY'] || core.getInput('secret-access-key');
const fileName = 'pageShot.png';
const s3Client = new S3Client({
    region: REGION,
    aws_access_key_id: AWS_ACCESS_KEY_ID,
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
});

// load puppeteer object
const puppeteer = require('puppeteer');

// create browser instance
async function launchBroswer(){
    return await puppeteer.launch();
}

// close browser when we are done
async function closeBroswer(browser){
    await browser.close()
}

// set puppeteer params
const URL = "https://lawalbolaji.github.io";
const browser = launchBroswer();

// screenshot function: doesnt save to file, returns binary stream of generated image
async function screenshot(browser){
    const page = await browser.newPage();

    await page.setViewport({
        width: 1280,
        height: 800
    });

    await page.goto(URL);

    return await page.screenshot({fullPage: true});
}

// saveImage(): dump the binary into an existing s3 bucket.
async function saveImage(screenshot) {

    // configure params for putObject Command
    const params = {
        Bucket: "bonango.io-screenshots",
        Key: fileName,
        Body: screenshot,
        ContentType: "image/png",
        ContentDisposition: "inline"
    };

    try {
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log(
            `Successfully created ${params.Key} and uploaded it to ${params.Bucket}/${params.Key}`
        );
        return results; // for unit testing
    } catch (error) {
        console.error(error);
    }
}

async function run(browser){
    browser.then(async data => {
        const shot = await screenshot(data)
        await closeBroswer(data);

        return shot;

    }).then(shot => saveImage(shot));
}


run(browser);