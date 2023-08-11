# create-node-cloudinary-basic

## Cloudinary Node SDK Basic Usage Sample Project ##

Creates a Node JS console application that have the Cloudinary library integration and basic sample usage.

The basic sample uploads local and remote image to Cloudinary and generates URLs for applying various image transformations on the uploaded files.

### Installation

To create a Node JS basic project containing the Cloudinary SDK, run:

```
npx create-node-cloudinary-basic@latest my_cldnodejs_project
```

The `index.js` have functions and the application entry is using the `main()`:

```
if (require.main === module) {
  main();
}
```

The sample modules are in the folder `./src`.

## Additional resources ##

* [Node integration documentation](http://cloudinary.com/documentation/node_integration)
* [Image transformations documentation](http://cloudinary.com/documentation/node_image_manipulation)
* [Node Image Upload](http://cloudinary.com/documentation/node_image_upload)