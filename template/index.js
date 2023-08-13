require('dotenv').load();

var fs = require('fs');
var colors = require('colors');
var appConsoleMain = require('./src/appmain/app_main');
var logger = require('./src/appmain/app_utility');

require('./src/cloudinary/image_upload_api');
require('./src/cloudinary/video_upload_api');


/**
 * Main function
 * This has to be async in order to use the await the cloudinary API requests
 */
async function main() {

  logger.info("\nStarting app...");
  if(appConsoleMain.initialize())
  {
    logger.info("\n*********************************************".green)
    logger.info("*** Hello world!!!".green);
    logger.info("*********************************************".green)

    logger.processlog("\nPerforming image upload processing...");

    imageFileUploadBasicFunc();
    imageFileUploadPromiseFunc();
    imageFileUploadWithPublicIdFunc();
    imageFileUploadWithEagerTransformationFunc();
    imageFileUploadFromRemoteURLFunc();
    imageFileUploadUsingStreamFunc();
    imageFileUploadBase64EncodedFunc();
    
  }
  else
  {
    logger.warn("Kindly update the .env parameters!\n")
  }
  
}

if (require.main === module) {
  main();
}