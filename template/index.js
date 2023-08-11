require('dotenv').load();
var fs = require('fs');
var colors = require('colors');

var cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


/**
 * Initialize function
 * - This function checks if the parameters in the .env file is updated
 */
function initialize(){
  
  var bResult = true;

  if((process.env.CLOUD_NAME).toUpperCase().match("YOUR_CLOUD_NAME")){
    console.log("Kindly update the parameter: %s", "CLOUD_NAME".italic.bold.yellow);
    bResult = false;
  }

  if((process.env.API_KEY).toUpperCase().match("YOUR_API_KEY")){
    console.log("Kindly update the parameter: %s", "API_KEY".italic.bold.yellow);
    bResult = false;
  }

  if((process.env.API_SECRET).toUpperCase().match("YOUR_API_SECRET")){
    console.log("Kindly update the parameter: %s", "API_SECRET".italic.bold.yellow);
    bResult = false;
  }

  return bResult;
}


/**
 * Main function
 */
function main() {

  var bContinue = initialize();

  // CRUD function samples

  // Advance features


  if(bContinue){
    console.log("\nHello world!!!\n".green);
  }
}

if (require.main === module) {
  main();
}