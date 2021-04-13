var fs = require("fs");
var pkgcloud = require('pkgcloud');
require('dotenv').config();

const downloadEmailAttachments = require('download-email-attachments');
/* If output name of the file is not coming well, just go to save-attachment-stream.js
and for var generatedFileName remove .replace method.
node_modules\download-email-attachments\lib\save-attachment-stream.js
var generatedFileName = replaceTemplate(state.filenameTemplate,meta)//.replace(state.invalidChars, '_')
*/

const moment = require('moment');
const opDir = ".";
const email = process.env.GMAIL_USER_LOGIN;
const password =  process.env.GMAIL_USER_PASSWORD;
const port = 993;
const host = 'imap.gmail.com';
const todaysDate = moment().format('YYYY-MM-DD');
var reTry = 1;

var config_attachment = {
    invalidChars: /\W/g,
    account: `"${email}":${password}@${host}:${port}`,
    directory: opDir,
    filenameTemplate: '{filename}',
    filenameFilter: /.xlsx?$/,
    timeout: 10000,
    log: {  warn: console.warn,
            debug: console.info,
            error: console.error,
            info: console.info
        },
    since: todaysDate,
    lastSyncIds: ['234', '234', '5345'],
    attachmentHandler: function (attachmentData, callback, errorCB) {
        console.log(attachmentData);
        callback()
    }
}

var onEnd = (result) => {

    if (result.errors || result.error) {
        console.log("Error ----> ", result);
        if(reTry < 4 ) {
             console.log('retrying....', reTry++)
             return downloadEmailAttachments(config_attachment, onEnd);
        } else  console.log('Failed to download attachment')
    } else {
        console.log("done ----> ");
        fs.readdirSync('.').forEach(file =>{
            if(file.slice(file.lastIndexOf('.'),file.length)=='.xlsx'){
                console.log(file);
                uploadBlobStorage(file,process.env.AZURE_STORAGE_CONTAINER_NAME);
            }
        });
    }
}

async function uploadBlobStorage(filename,containerName){

    var client = pkgcloud.storage.createClient({
        provider: 'azure',
        storageAccount: process.env.AZURE_STORAGE_ACCOUNT_NAME,
        storageAccessKey: process.env.AZURE_STORAGE_ACCOUNT_KEY
    });
      
    var readStream = fs.createReadStream(filename);
    var writeStream = client.upload({
        container: containerName,
        remote: filename
    });
      
    writeStream.on('error', function (err) {
        console.log("failed to upload file in azure storage : ",err);
    });
      
    writeStream.on('success', function (file) {
        console.log(file," uploaded successfully");
    });
      
    readStream.pipe(writeStream);

}

downloadEmailAttachments(config_attachment, onEnd);