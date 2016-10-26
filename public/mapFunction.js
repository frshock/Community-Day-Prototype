// module.exports = [43.653226, -79.38318429999998];
 

tempArray = [43.653226, -79.38318429999998]; 

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 43.653226, lng: -79.38318429999998}
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
    }

    function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);

        tempArray[0] = results[0].geometry.location.lat();
        tempArray[1] = results[0].geometry.location.lng();

        console.log(tempArray);

        var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
        });
        } else {
        alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

module.exports = tempArray;