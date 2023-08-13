require("dotenv").load();

var fs = require("fs");

const util = require("util");
const path = require("path");
const logger = require("../appmain/app_utility");
const underliner =
  "                                                                                           \n"
    .underline;
const resultdata = "  %s: %s";

cloudinary = require("cloudinary").v2;

// set your env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

var uploads = {};
var processCount = 1;

(function () {

  /**
   * videoFileUploadBasicFunc
   * 
   * - Upload the video file
   */
  videoFileUploadBasicFunc = function(){

      var targetvideo = `${process.cwd()}/assets/videos/hero_animation_2022.mp4`;
  
      // File upload
      cloudinary.uploader.upload(targetvideo, {
          resource_type: 'video',
          tags: 'basic_video_sample' 
      }, function (err, video) {

        if (err) { 
          console.warn(err); 
        }
        else
        {
          logger.processlog(underliner);
          logger.processlog('Executed: File Upload (Basic)'.bold.white);
          logger.processlog(`Uploading the following: ${targetvideo}`);
          logger.processlog('\nUpload parameters:'.underline);
          logger.processlog(`  resource_type: 'video'`);
          logger.processlog(`  tags: 'basic_video_sample'`);

          logger.processlog('\nResult:'.underline);
          logger.processlog(util.format(resultdata, "public_id  ", video.public_id.white));
          logger.processlog(util.format(resultdata, "secure_url ", video.secure_url.white));
          
          logger.processlog('\nNote:'.underline);
          logger.processlog(`  The public_id for the uploaded video is generated by Cloudinary's service`);

          logger.info('\n\nvideo_upload_api::videoFileUploadBasicFunc - completed!'.green);
          logger.processlog(underliner);

          waitForAllVideoUploads("video000", err, video);

        }
      });
    }

  waitForAllVideoUploads = function (id, err, video) 
  {
    uploads[id] = video;
    var ids = Object.keys(uploads);

    logger.info(
      util.format("Overall processed video : %d\n\n", ids.length)
    );

    if (ids.length === processCount) {
      logger.info("\nUploaded all files (" + ids.join(",") + ") to cloudinary\n".green);
    }
  }

})();