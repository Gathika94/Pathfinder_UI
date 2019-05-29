var marker;

$(document).ready(function () {

  mymap = L.map('mapid').setView([6.798123810285711, 79.89934290802692], 19, 19);

  L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
    maxZoom: 19,
    accessToken: 'pk.eyJ1IjoibGFzaGFuIiwiYSI6ImNqYmc3dGVybTFlZ3UyeXF3cG8yNGxsdzMifQ.n3QEq0-g5tVFmsQxn3JZ-A',
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mymap);
 /* L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png', {
    maxZoom: 40
  }).addTo(mymap);*/

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

  mymap.addControl( new L.Control.Search({
    url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    marker: L.circleMarker([0,0],{radius:30}),
    autoCollapse: true,
    autoType: false,
    minLength: 2
  }) );


  //var searchLayer = L.layerGroup().addTo(mymap);
//... adding data in searchLayer ...
  //mymap.addControl( new L.Control.Search({layer: searchLayer}) );
//searchLayer is a L.LayerGroup contains searched markers





  /* mymap.on('click', function (e) {
     if (marker) { // check
       mymap.removeLayer(marker); // remove
       marker=null;
       console.log(e.latlng)
       console.log(mymap.getZoom())
     }else {
       marker = new L.Marker(e.latlng).addTo(mymap); // set
       console.log(e.latlng)
       console.log(mymap.getZoom())
     }
   });*/

  /*var startingMarker = L.marker([6.798123810285711, 79.89934290802692], {draggable: true})
    .addTo(mymap)
    .on('dragend', function() {
    });
  startingMarker.valueOf()._icon.style.backgroundColor = 'orange'*/

  /*var destinationMarker = L.marker([6.798720400636967, 79.89957900978649], {draggable: true})
    .addTo(mymap)
    .on('dragend', function() {
    });
  destinationMarker.valueOf()._icon.style.backgroundColor = 'red'*/

  var startingMarker = L.shapeMarker([6.798123810285711, 79.89934290802692], {
    shape: "triangle",
    radius: 10,
    color: "red",
    fill: true,
    fillOpacity: 1.0
  })

  var destinationMarker = null;


  startingMarker.addTo(mymap)


  mymap.on('click', function (e) {
    if (destinationMarker) { // check
      mymap.removeLayer(destinationMarker); // remove
      destinationMarker=null;
      addNewDestinationMarker(e)
      console.log(e.latlng)
      console.log(mymap.getZoom())
    }else {
      /*destinationMarker = new L.Marker(e.latlng).addTo(mymap); // set
      console.log(e.latlng)
      console.log(mymap.getZoom())*/
      addNewDestinationMarker(e);
    }
  })

  getLatestDevicePosition();

  function addNewDestinationMarker(e){
    destinationMarker = L.shapeMarker(e.latlng, {
      draggable:true,
      shape: "circle",
      radius: 10,
      color: "blue",
      fill: true,
      fillOpacity: 1.0
    })
    destinationMarker.addTo(mymap).on('dragend', function() {
    });
  }

});

function getLatestDevicePosition() {
  $.ajax({
    type: "GET",
    //dataType: "json",
    url: "http://localhost:3000/device-pos/1",
    success: function (data) {
      console.log(data);

    },
    error: function (jqXHR, status, err) {
      alert("Error when receiving the data from external server");
    },
  })
}