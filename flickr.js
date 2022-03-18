
function processJSON (json) {
    for (i = 0; i < json.items.length; i++) {
        // item variable created with value set to json array
        var item = json.items[i];
        // create html code for each image source
        var imgHTML = "<img src='" + item.media.m + "'/>";
        // place image on page by writing to document
        document.getElementById("flickrGallery").innerHTML +=imgHTML;
    }
}