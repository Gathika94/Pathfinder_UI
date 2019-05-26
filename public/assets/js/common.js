var servlet = "http://localhost:8080/railgate";
var api = servlet+"/invoke";

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
};

var iconRed = L.icon({
    iconUrl: 'assets/img/pin-red.svg',
    iconSize: [42, 42], // size of the icon
    iconAnchor: [21, 21]
});
var iconGreen = L.icon({
    iconUrl: 'assets/img/pin-green.svg',
    iconSize: [42, 42], // size of the icon
    iconAnchor: [21, 21]
});
var iconNormal = L.icon({
    iconUrl: 'assets/img/pin.svg',
    iconSize: [42, 42], // size of the icon
    iconAnchor: [21, 21]
});