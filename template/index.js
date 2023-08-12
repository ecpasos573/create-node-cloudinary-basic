require('dotenv').load();

var fs = require('fs');
var colors = require('colors');
var objAppMain = require('./src/appmain/app_main');
var objLogger = require('./src/appmain/app_utility');

require('./src/cloudinary/image_upload_api');


global.cloudinary = require('cloudinary').v2;


/**
 * Main function
 * This has to be async in order to use the await the cloudinary API requests
 */
async function main() {

  objLogger.info("\nStarting app...");
  objAppMain.initialize();

  objLogger.processlog("\nPerforming image upload processing...\n");

  await funcImageUploadBasic001();

  await funcImageUploadBasic002();

  // **********

  // Image: CRUD function samples

  // Image: Advance features



  //objLogger.processlog("\nPerforming image upload processing...\n");

  // **********

  // Video: CRUD function samples

  // Video: Advance features

  // **********

  objLogger.info("\nHello world!!!\n".green);
  
}

if (require.main === module) {
  main();
}