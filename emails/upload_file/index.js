const { upload_file } = require('../index.js');

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.IsPastDue)
    {
        context.log('JavaScript is running late!');
    }
    else{
        context.log('JavaScript timer trigger function ran!', timeStamp);
        upload_file();
    }
  
};