require('dotenv').load();

var objLogger = require('../appmain/app_utility');

cloudinary = require('cloudinary').v2;

// set your env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});


(function () {

    funcImageUploadBasic001 = async function() {
      objLogger.info("image_upload_api: funcImageUploadBasic001");
      try {
        // after this line, our function will wait for the `fetch()` call to be settled
        // the `fetch()` call will either return a Response or throw an error
        const response = await fetch(
          "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // after this line, our function will wait for the `response.json()` call to be settled
        // the `response.json()` call will either return the parsed JSON object or throw an error
        const data = await response.json();
        console.log(data[0].name);
      } catch (error) {
        console.error(`Could not get products: ${error}`);
      }
      objLogger.info('funcImageUploadBasic001: ongoing_development'.yellow);
    }

    funcImageUploadBasic002 = async function() {
      objLogger.info("image_upload_api: funcImageUploadBasic002");
      try {
        // after this line, our function will wait for the `fetch()` call to be settled
        // the `fetch()` call will either return a Response or throw an error
        const response = await fetch(
          "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // after this line, our function will wait for the `response.json()` call to be settled
        // the `response.json()` call will either return the parsed JSON object or throw an error
        const data = await response.json();
        console.log(data[0].name);
      } catch (error) {
        console.error(`Could not get products: ${error}`);
      }
      objLogger.info('funcImageUploadBasic002: ongoing_development'.yellow);
    }


    funcImageFileUpload = async function() {
      objLogger.info("image_upload_api: funcImageFileUpload");
      try {
        // after this line, our function will wait for the `fetch()` call to be settled
        // the `fetch()` call will either return a Response or throw an error
        const response = await fetch(
          "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        // after this line, our function will wait for the `response.json()` call to be settled
        // the `response.json()` call will either return the parsed JSON object or throw an error
        const data = await response.json();
        console.log(data[0].name);
      } catch (error) {
        console.error(`Could not get products: ${error}`);
      }
      objLogger.info('funcImageUploadBasic002: ongoing_development'.yellow);
    }


})();