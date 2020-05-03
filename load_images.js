function loadImages(imagefiles) {
    // Initialize variables
    let loadcount = 0;
    let loadtotal = imagefiles.length;
    let preloaded = false;
 
    // Load the images
    let loadedimages = [];
    for (let i=0; i < imagefiles.length; i++) {
        // Create the image object
        let image = new Image();
 
        // Add onload event handler
        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                // Done loading
                preloaded = true;
            }
        };
 
        // Set the source url of the image
        image.src = imagefiles[i];
 
        // Save to the image array
        loadedimages[i] = image;
    }
 
    // Return an array of images
    return loadedimages;
}