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

/**
 * Set the env variable CLOUDINARY_URL or set the following configuration
 */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

var uploads = {};
var processCount = 7;

(function () {

  /**
   * imageFileUploadBasicFunc
   * 
   * - Basic file upload
   */
  imageFileUploadBasicFunc = function () {

    var targetImage = `${process.cwd()}/assets/images/pizza.jpg`;

    cloudinary.uploader.upload(targetImage,{ tags: "basic_sample" }, function (err, image) {
        
      if (err) {
        logger.error(err);
      }
      else{

        logger.processlog(underliner);
        logger.processlog('Executed: File Upload'.bold.white);
        logger.processlog(`Uploading the following: ${targetImage}`);
        logger.processlog('\nUpload parameters:'.underline);
        logger.processlog(`  tags: 'basic_sample'`);

        logger.processlog('\nResult:'.underline);
        logger.processlog(util.format(resultdata, "public_id  ", image.public_id.white));
        logger.processlog(util.format(resultdata, "secure_url ", image.secure_url.white));
        
        logger.processlog('\nNote:'.underline);
        logger.processlog(`  The public_id for the uploaded image is generated by Cloudinary's service`);

        logger.info('\n\nimage_upload_api::imageFileUploadBasicFunc - completed!'.green);
        logger.processlog(underliner);

        waitForAllImageUploads("image000", err, image);
      }
        
    });
  };

  /**
   * imageFileUploadPromiseFunc
   * 
   * - File upload (example for promise api)
   */
  imageFileUploadPromiseFunc = function () {
    
    var targetImage = `${process.cwd()}/assets/images/pizza.jpg`;

    cloudinary.uploader.upload(targetImage, { tags: "basic_sample" })
      .then(function (image) {
        
        logger.processlog(underliner);
        logger.processlog('Executed: File Upload (Promise)'.bold.white);
        logger.processlog(`Uploading the following: ${targetImage}`);
        logger.processlog('\nUpload parameters:'.underline);
        logger.processlog(`  tags: 'basic_sample'`);

        logger.processlog('\nResult:'.underline);
        logger.processlog(util.format(resultdata, "public_id  ", image.public_id.white));
        logger.processlog(util.format(resultdata, "secure_url ", image.secure_url.white));
        
        logger.processlog('\nNote:'.underline);
        logger.processlog(`  The public_id for the uploaded image is generated by Cloudinary's service`);

        logger.info('\n\nimage_upload_api::imageFileUploadPromiseFunc - completed!'.green);
        logger.processlog(underliner);

        waitForAllImageUploads("image001", null, image);

      })
      .catch(function (err) {
        console.log("\n** File Upload (Promise)");
        if (err) {
          logger.error(err);
        }
      });
  };

  /**
   * imageFileUploadWithPublicIdFunc
   * 
   * - Upload together with public_id parameter
   */
  imageFileUploadWithPublicIdFunc = function () {
    
    var targetImage = `${process.cwd()}/assets/images/pizza.jpg`;

    cloudinary.uploader.upload(targetImage, { public_id: "my_favorite_pizza", tags: "basic_sample" }, 
      function (err, image) {
        if (err) {
          logger.error(err);
        }
        else {
          logger.processlog(underliner);
          logger.processlog('Executed: File Upload (Public Id)'.bold.white);
          logger.processlog(`Uploading the following: ${targetImage}`);
          logger.processlog('\nUpload parameters:'.underline);
          logger.processlog(`  public_id: 'my_favorite_pizza'`);
          logger.processlog(`  tags: 'basic_sample'`);

          logger.processlog('\nResult:'.underline);
          logger.processlog(util.format(resultdata, "public_id  ", image.public_id.white));
          logger.processlog(util.format(resultdata, "secure_url ", image.secure_url.white));
          
          logger.processlog('\nNote:'.underline);
          logger.processlog(`  The public_id for the uploaded image is provided as a parameter`);

          logger.info('\n\nimage_upload_api::imageFileUploadWithPublicIdFunc - completed!'.green);
          logger.processlog(underliner);

          waitForAllImageUploads("image002", err, image);
        }        
      }
    );
  };

  /**
   * imageFileUploadWithEagerTransformationFunc
   * 
   * - Upload together with eager transformation parameter
   */
  imageFileUploadWithEagerTransformationFunc = function () {

    var targetImage = `${process.cwd()}/assets/images/lake.jpg`;

    // Eager Transformations:
    // Applied as soon as the file is uploaded, instead of lazily applying them when accessed by your site's visitors.
    var eager_options = {
      width: 200,
      height: 150,
      crop: "scale",
      format: "jpg",
    };

    cloudinary.uploader.upload(targetImage, { public_id: "blue_lake", tags: "basic_sample", eager: eager_options },
      function (err, image) 
      {

        if (err) {
          console.warn(err);
        }
        else
        {
          logger.processlog(underliner);
          logger.processlog('Executed: File Upload (Eager Transformation)'.bold.white);
          logger.processlog(`Uploading the following: ${targetImage}`);
          logger.processlog('\nUpload parameters:'.underline);
          logger.processlog(`  public_id: 'blue_lake'`);
          logger.processlog(`  tags: 'basic_sample'`);
          logger.processlog(`  eager: eager_options`);

          logger.processlog('\nResult:'.underline);
          logger.processlog(util.format(resultdata, "public_id  ", image.public_id.white));
          logger.processlog(util.format(resultdata, "secure_url ", image.secure_url.white));
          
          logger.processlog('\nNote:'.underline);
          logger.processlog(`  The "eager" parameter accepts a hash (or just a single item).`);
          logger.processlog(`  A named transformations and/or transformation parameters can be used here.`);

          logger.info('\n\nimage_upload_api::imageFileUploadWithEagerTransformationFunc - completed!'.green);
          logger.processlog(underliner);

          waitForAllImageUploads("image003", err, image);
        }
      }
    );
  };

  /**
   * imageFileUploadFromRemoteURLFunc
   * 
   * - Upload an image from a remote location through its URL
   */
  imageFileUploadFromRemoteURLFunc = function () {

    var targetImageUrl = `http://res.cloudinary.com/demo/image/upload/couple.jpg`;

    // Remote URL:
    // In the two following examples, the file is fetched from a remote URL and stored in Cloudinary.
    // This allows you to apply transformations and take advantage of Cloudinary's CDN layer.
    cloudinary.uploader.upload(targetImageUrl, { tags: "basic_sample" },
      function (err, image) 
      {
        if (err) {
          console.warn(err);
        }
        else
        {

          logger.processlog(underliner);
          logger.processlog('Executed: File Upload (Remote Image URL)'.bold.white);
          logger.processlog(`Uploading the following: ${targetImageUrl}`);
          logger.processlog('\nUpload parameters:'.underline);
          logger.processlog(`  tags: 'basic_sample'`);

          logger.processlog('\nResult:'.underline);
          logger.processlog(util.format(resultdata, "public_id  ", image.public_id.white));
          logger.processlog(util.format(resultdata, "secure_url ", image.secure_url.white));
          
          logger.processlog('\nNote:'.underline);
          logger.processlog(`  The file is fetched from a remote URL and it is stored in Cloudinary.`);
          logger.processlog(`  This allows applying of transformations and will take advantage of Cloudinary's CDN layer.`);

          logger.info('\n\nimage_upload_api::imageFileUploadFromRemoteURLFunc - completed!'.green);
          logger.processlog(underliner);

          waitForAllImageUploads("image004", err, image);
        }
      }
    );
  };

  /**
   * imageFileUploadUsingStreamFunc
   * 
   * - Upload an image through the file stream
   */
  imageFileUploadUsingStreamFunc = function () {

    var targetImage = `${process.cwd()}/assets/images/pizza.jpg`;

    // Stream upload
    var upload_stream = cloudinary.uploader.upload_stream({ tags: "basic_sample" },
      function (err, image) 
      {
        if (err) {
          console.warn(err);
        }
        else
        {
          logger.processlog(underliner);
          logger.processlog('Executed: File Upload (Stream)'.bold.white);
          logger.processlog(`Uploading the following: ${targetImage}`);
          logger.processlog('\nUpload parameters:'.underline);
          logger.processlog(`  tags: 'basic_sample'`);

          logger.processlog('\nResult:'.underline);
          logger.processlog(util.format(resultdata, "public_id  ", image.public_id.white));
          logger.processlog(util.format(resultdata, "secure_url ", image.secure_url.white));
          
          logger.processlog('\nNote:'.underline);
          logger.processlog(`  The public_id for the uploaded image is generated by Cloudinary's service`);

          logger.info('\n\nimage_upload_api::imageFileUploadUsingStreamFunc - completed!'.green);
          logger.processlog(underliner);

          waitForAllImageUploads("image005", err, image);
        }
      }
    );
    fs.createReadStream(targetImage).pipe(upload_stream);
  };

  /**
   * imageFileUploadBase64EncodedFunc
   * 
   * - Upload a Base64 encoded image
   */
  imageFileUploadBase64EncodedFunc = function () {
    const base64Image =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

    // File upload
    cloudinary.uploader.upload(base64Image, { tags: "basic_sample" },
      function (err, image) 
      {
        if (err) {
          console.warn(err);
        }
        else
        {
          logger.processlog(underliner);
          logger.processlog('Executed: File Upload (Remote Image URL)'.bold.white);
          logger.processlog(`Uploading the following: ${base64Image}`);
          logger.processlog('\nUpload parameters:'.underline);
          logger.processlog(`  tags: 'basic_sample'`);

          logger.processlog('\nResult:'.underline);
          logger.processlog(util.format(resultdata, "public_id  ", image.public_id.white));
          logger.processlog(util.format(resultdata, "secure_url ", image.secure_url.white));
          
          logger.processlog('\nNote:'.underline);
          logger.processlog(`  The public_id for the uploaded image is generated by Cloudinary's service.`);

          logger.info('\n\nimage_upload_api::imageFileUploadFromRemoteURLFunc - completed!'.green);
          logger.processlog(underliner);

          waitForAllImageUploads("image006", err, image);
        }
      }
    );
  };

  waitForAllImageUploads = function (id, err, image) {
    uploads[id] = image;
    var ids = Object.keys(uploads);

    logger.info(
      util.format("Overall processed image : %d\n\n", ids.length)
    );

    if (ids.length === processCount) {
      logger.info("\nUploaded all files (" + ids.join(",") + ") to cloudinary\n".green);
    }
  };

})();