const Imap = require("imap");
const inspect = require("util").inspect;
var fs      = require("fs");
var base64  = require("base64-stream");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
require('dotenv').config();

var imapConfig = {
    user: process.env.GMAIL_USER_LOGIN,
    password: process.env.GMAIL_USER_PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
};

var imap = new Imap(imapConfig);
imap.connect();

async function openInbox(callback) {
    imap.openBox('INBOX', true, callback);
}

imap.once('ready',function(){
    openInbox(function(err,box){

        if(err) throw err;
        console.log("connected"); // CONNEXION A LA BOITE GMAIL

        imap.search(
            ['UNSEEN', ['SINCE', 'April 09, 2021'],
            ['FROM', process.env.EMAIL_SENDER]],
            function(err, results){
                if(err) throw err;
                console.log("email non lu"); // LECTURE DES EMAILS NON LUS ENVOYES PAR UNE ADRESSE MAIL PRECISE

                var f = imap.fetch(results,{bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'], struct: true});
                f.on('message',function(message,num_seq){ // LECTURE DU MESSAGE CONTENU DANS LE CORPS DU MAIL
                    console.log('Message #%d',num_seq);
                    var prefix = '(#' + num_seq + ') ';

                    message.on('body',function(stream,info){
                        var buffer = ''; // INITIALISATION DU BUFFER

                        stream.on('data',function(chunk){
                            buffer += chunk.toString('utf8'); // CONCATENATION DU BUFFER AVEC LE CONTENU DU STREAM
                        });

                        stream.once('end', function() { // FIN DU STREAM
                            console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                        });
                    });

                    message.once('attributes',function(attributes){ // LECTURE DES ATTRIBUTS DU CORPS DU MAIL
                        console.log(prefix + 'Has attachments: %d', attributes.struct.length);
                        for(i=0;i<attributes.struct.length;i++){
                            if(attributes.struct[i][0] != undefined){
                                try{
                                    console.log("filename : ",attributes.struct[i][0]["disposition"]["params"]["filename"]);
                                    console.log(prefix + 'Fetching attachment %s', attributes.struct[i][0]["disposition"]["params"]["filename"]);
                                    var f = imap.fetch(attributes.uid , {
                                        bodies: [attributes.struct[i][0].partID],
                                        struct: true
                                    });

                                    // RECUPERATION DU FICHIER EXCEL
                                    f.on('message',buildAttachmentMessageFunction(attributes.struct[i]));

                                }catch{

                                }
                            }
                        }
                    });

                    message.once('end',function(){ // FIN DE LECTURE DU MESSAGE
                        console.log(prefix + 'Finished');
                    });
                });

                f.once('error', function(err) { // ERREUR DE LECTURE DU MESSAGE
                    console.log('Fetch error: ' + err);
                });
                
                f.once('end', function() { // FIN DE LECTURE DU MAIL
                    console.log('Done fetching all messages!');
                    imap.end();
                });
        });
    });
});

function buildAttachmentMessageFunction(attachment) {
    var filename = attachment[0]["disposition"]["params"]["filename"];
    var encoding = attachment.encoding;
  
    return function (message, seqno) {
        var prefix = '(#' + seqno + ') ';
        message.on('body', function(stream, info) {
            //Create a write stream so that we can stream the attachment to file;
            console.log(prefix + 'Streaming this attachment to file', filename, info);
            var writeStream = fs.createWriteStream(filename);
            writeStream.on('finish', function() {
                console.log(prefix + 'Done writing to file %s', filename);
            });
    
            //stream.pipe(writeStream); this would write base64 data to the file.
            //so we decode during streaming using 
            if (encoding === 'BASE64') {
                //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
                stream.pipe(base64.decode()).pipe(writeStream);
            } else  {
                //here we have none or some other decoding streamed directly to the file which renders it useless probably
                stream.pipe(writeStream);
            }
        });
        message.once('end', function() {
            console.log(prefix + 'Finished attachment %s', filename);
            uploadBlobStorage(filename,"images");
        });
    };
};

async function uploadBlobStorage(filename,containerName){

    const account = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";
    const customBlockSize = 4 * 1024 * 1024;

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,sharedKeyCredential
    );
    blobServiceClient.singleBlobPutThresholdInBytes = customBlockSize;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(filename);
    const blockBlobClient = blobClient.getBlockBlobClient();

    var content = "";
    fs.open(filename,'r',function(status,fd){
        if (status) {
            console.log(status.message);
            return;
        }
        var buffer = Buffer.alloc(customBlockSize);
        fs.read(fd, buffer, 0, customBlockSize, 0, function(err, num) {
            content = buffer.toString('base64', 0, num);
            console.log(content);
        });
    });

    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${filename} successfully`, uploadBlobResponse.requestId);

}