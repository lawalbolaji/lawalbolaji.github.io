require('dotenv').config();
const {S3Client} = require('@aws-sdk/client-s3');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const {screenshot} = require('./screenshot');
const fs = require('fs');

const args = process.argv.slice(2); // collect terminal args

const REGION = process.env['AWS_DEFAULT_REGION'] || 'us-east-2';
const AWS_ACCESS_KEY_ID = process.env['AWS_ACCESS_KEY_ID'] || args[0]; // if no access to environment varibales, get from terminal args
const AWS_SECRET_ACCESS_KEY = process.env['AWS_SECRET_ACCESS_KEY'] || args[1];
const fileName = 'pageShot.png';
const url = "https://lawalbolaji.github.io";

// configure aws client
const s3Client = new S3Client({
    region: REGION,
    aws_access_key_id: AWS_ACCESS_KEY_ID,
    aws_secret_access_key: AWS_SECRET_ACCESS_KEY
});

// load file
function loadFile(fileName){
    try {
        return fs.createReadStream(fileName);
    } catch (error) {
        console.error(error);
    }
};


const params = {
    Bucket: "bonango.io-screenshots",
    Key: fileName,
    Body: loadFile(fileName),
    ContentType: "image/png",
    ContentDisposition: "inline"
};

async function saveImage() {
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


screenshot(url);
saveImage();