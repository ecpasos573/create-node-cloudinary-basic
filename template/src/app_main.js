module.exports = {

    /**
     * Initialize function
     * - This function checks if the parameters in the .env file is updated
     * 
     * @returns bResult
     */
    initialize: function() {

        var bResult = true;

        if((process.env.CLOUD_NAME).toUpperCase() === "YOUR_CLOUD_NAME"){
            console.log("Kindly update the parameter: %s", "CLOUD_NAME".italic.bold.yellow);
            bResult = false;
        }

        if((process.env.API_KEY).toUpperCase() === "YOUR_API_KEY"){
            console.log("Kindly update the parameter: %s", "API_KEY".italic.bold.yellow);
            bResult = false;
        }

        if((process.env.API_SECRET).toUpperCase() === "YOUR_API_SECRET"){
            console.log("Kindly update the parameter: %s", "API_SECRET".italic.bold.yellow);
            bResult = false;
        }

        if(bResult){
            /*
            // Initialize the global variable `cloudinary`
            global.cloudinary.config({ 
                cloud_name: process.env.CLOUD_NAME, 
                api_key: process.env.API_KEY, 
                api_secret: process.env.API_SECRET,
                secure: true 
            });
            */
           console.log("Initialization done...");
        }

        return bResult;        
    },

    /**
     * Perform the general app processing 
     * @returns bResult
     */
    execute_general_processes: function() {
        var bResult = false;

        console.log("General processes can be done in this module")
        
        return bResult;
    }
};