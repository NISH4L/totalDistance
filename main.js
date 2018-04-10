//Credit goes to Google API Documentations and few Youtube instructions.


//First we setup Maps Variable
var LatLong = { lat: 40.7, lng: -74.0 }; //NYC coordinates
var mainOptions = {
    center: LatLong,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//Building a new map first
var map = new google.maps.Map(document.getElementById('googleMap'), mainOptions);

//Using DirectionsService to get the route as per user input
var directionsService = new google.maps.DirectionsService();

//Using DirectionsRenderer to create the object
var directionsRenderer = new google.maps.DirectionsRenderer();

//Whatever directionsRenderer is produced, put it in the map
directionsRenderer.setMap(map);


//totalDistance function that will be used by button
function totalDistance() {

    //defining a user request variable
    var userRequest = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //Using function above to get the route
    directionsService.route(userRequest, function (result, status) {

      //If the location is found on map, do this
        if (status == google.maps.DirectionsStatus.OK) {

            //Using totalDistance function, acquire time and direction
            $("#resultdiv").html("<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving Distance: " + result.routes[0].legs[0].distance.text + ".<br />Time Needed: " + result.routes[0].legs[0].duration.text + ".</div>");

            //Finally, display it in the map
            directionsRenderer.setDirections(result);

      //Or else just do this
        } else {
            //clear the input from Map
            directionsRenderer.setDirections({ routes: [] });

            //center map
            map.setCenter(LatLong);

            //display error
            $("#resultdiv").html("<div class='alert-danger'>Not Possible. Take a Flight Instead?</div>");
        }
    });

}

//This function uses auto complete location input from API.
var options = {
    types: ['(cities)']
}

var inputFrom = document.getElementById("from");
var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);

var inputTo = document.getElementById("to");
var autocompleteTo = new google.maps.places.Autocomplete(inputTo, options);
