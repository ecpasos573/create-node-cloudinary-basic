require('dotenv').load();
var fs = require('fs');
var colors = require('colors');

var cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

console.log("Hello world!!!".green);