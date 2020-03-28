var LocationPicker = require("location-picker");

var locationPicker = new LocationPicker('map', {
    setCurrentPosition : true
}, {
    zoom : 15
});

var locationObj = locationPicker.getMarkerPosition()

console.log(locationObj)