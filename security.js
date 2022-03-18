// global variables used to initially declare coordinates in order to print them onscreen later
var alt;
var lat;
var lng;


// get user's location by accessing the getCurrentPosition() method from the Geolocation API
    navigator.geolocation.getCurrentPosition(
        function (position) {
            initMap(position.coords.latitude, position.coords.longitude)
            // stores the altitude, latitude, and longitude returned from getCurrentPosition
            alt = position.coords.altitude;
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            // calls the function that initates the map and passes above coordinates as parameters
            initMap(lat, lng, alt);
        },
        // log an error to the console if attempt to initiate map fails
        function errorCallback(error) {
            console.log(error)
        }
    );


 // function to initiate the map by calling on parameters defined from getCurrentPosition
 function initMap(lat, lng, alt) {
    // defines variable that calls user's current location > this is where marker and infoWindow will display by default
    var myLatLng = {
       lat,
       lng,
       alt
    };
    // call google map object to associate with the div that has an id of "map"
    var map = new google.maps.Map(document.getElementById('map'), {
       mapId: "e3dcb9949b92f289",   // this map ID was created in my Google Cloud Platform and has special JSON styling loaded into it
       zoom: 15,                    // level to zoom in on current location
       center: myLatLng             // center on predefined variable that sets user's current location
    });
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map)
    // call google marker object to settle on user's current position
    // this marker hides behind infoWindow unless user clicks away, in which case they can still see their exact location on the map
    var marker = new google.maps.Marker({
       position: myLatLng,
       map: map,
    });
    // defines the initial string for user's position to display in infoWindow
    var coordString =  "Latitude " + lat + "<br>Longitude: " + lng + "<br>Altitude: " + alt;
    // create the initial InfoWindow to show instructions for viewing coordinates
    let infoWindow = new google.maps.InfoWindow({
        content: coordString,
        position: myLatLng
    });

    infoWindow.open(map);
    // configure the click listener inside the map
    map.addListener("click", (mapsMouseEvent) => {
        // close the current InfoWindow when user clicks location
        infoWindow.close();
        // create a new InfoWindow and display latitude and longitude of selected location
        infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
        });  
        // converts latLng object values to printable string
        var updateCoords = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
        // allows latitude and longitude to update based on anywhere else user clicks
        infoWindow.setContent(updateCoords);
        // creates new infoWindow according to click event listener
        infoWindow.open(map);
        });
}
