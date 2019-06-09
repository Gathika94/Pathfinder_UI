

var marker;
var mymap;
var destinationMarker = null;
var startingMarker = null;
var ongoingJourney = false;
var markerClicked = false;

var startTemplate = '<div id="popup-form">\
   <button id="button-submit" type="button">Start</button>\
</div>';

var endTemplate =  '<div id="popup-form">\
   <button id="button-submit" type="button">Cancel</button>\
</div>';



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


  mymap.on('click', function (e) {
      if (destinationMarker) { // check
        if(!ongoingJourney) {
          if(!markerClicked) {
            console.log("cccc");
            console.log("removing layer");
            mymap.removeLayer(destinationMarker); // remove
            destinationMarker = null;
            addNewDestinationMarker(e);

            console.log(e.latlng)
            console.log(mymap.getZoom())
          }
          markerClicked=false;
        }
      }else {
        /*destinationMarker = new L.Marker(e.latlng).addTo(mymap); // set
        console.log(e.latlng)
        console.log(mymap.getZoom())*/
        addNewDestinationMarker(e);

      }

  })
  getLatestDevicePosition();
});

function getLatestDevicePosition() {
  $.ajax({
    type: "GET",
    //dataType: "json",
    url: "http://localhost:3000/device-pos?filter[order]=timestamp ASC&filter[limit]=1",
    success: function (data) {
      //console.log(data[0]);
      var jsonObject = data[0];
      var startLat = jsonObject["lat"];
      var startLong = jsonObject["long"];
      console.log("lat : "+ startLat);
      console.log("long : "+ startLong);
      updateDevicePosition(startLat,startLong);
    },
    error: function (jqXHR, status, err) {
      alert("Error when receiving the data from external server");
    },
  })
}

function updateDevicePosition(startLat,startLong) {
  if (startingMarker) { // check
    mymap.removeLayer(startingMarker); // remove
    addNewStartingMarker(startLat, startLong);
    /*console.log(e.latlng);
    console.log(mymap.getZoom())*/
  }else {
    /*destinationMarker = new L.Marker(e.latlng).addTo(mymap); // set
    console.log(e.latlng)
    console.log(mymap.getZoom())*/
    addNewStartingMarker(startLat,startLong);
  }
}

function addNewStartingMarker(startLat,startLong) {
  console.log("startLat");
  console.log(startLat)
  console.log("startLong");
  console.log(startLong);

  startingMarker = L.shapeMarker([startLat, startLong], {
    shape: "triangle",
    radius: 10,
    color: "red",
    fill: true,
    fillOpacity: 1.0
  })

  startingMarker.addTo(mymap)
}

function addNewDestinationMarker(e){
  console.log("latlang")
  console.log(e.latlng)
  destinationMarker = L.shapeMarker(e.latlng, {
    draggable:true,
    shape: "circle",
    radius: 10,
    color: "blue",
    fill: true,
    fillOpacity: 1.0
  });
  destinationMarker.on('click',destinationClickHandler)
  destinationMarker.addTo(mymap).on('dragend', function() {
  });

 /* destinationMarker.bindPopup(startTemplate);
  destinationMarker.addTo(mymap).on('dragend', function() {
  });

  var buttonSubmit = L.DomUtil.get('button-submit');
  L.DomEvent.addListener(buttonSubmit, 'click', function(e) {
    destinationMarker.closePopup();
    if(ongoingJourney){
      console.log("ongoingJourney old :" + ongoingJourney)
      ongoingJourney=false;
      console.log("ongoingJourney new :" + ongoingJourney)
    }else{
      console.log("ongoingJourney old :" + ongoingJourney)
      ongoingJourney=true;
      console.log("ongoingJourney new :" + ongoingJourney)
    }
  })
 buttonSubmit.addListener('click',function(e) {
   console.log("aaaaa")
 })*/
}

function destinationClickHandler(e) {
  console.log("marker clicked")
  markerClicked=true;
  if(!ongoingJourney){
    let marker = e.target;
    let markerEvent = e;

    if (marker.hasOwnProperty('_popup')) {
      marker.unbindPopup();
      console.log("aaaaa")
    }

    marker.bindPopup(startTemplate);
    marker.openPopup();

    let buttonSubmit = L.DomUtil.get('button-submit');
    L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
      console.log("bbbb");
      marker.closePopup();
      markerClicked=false;
      addNewStartJourneyInformation(markerEvent)
      ongoingJourney=true;

    });
  }else{
    let marker = e.target;
    let markerEvent = e;

    if (marker.hasOwnProperty('_popup')) {
      marker.unbindPopup();
      console.log("aaaaa")
    }

    marker.bindPopup(endTemplate);
    marker.openPopup();

    let buttonSubmit = L.DomUtil.get('button-submit');
    L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
      marker.closePopup();
      markerClicked=false;
      addCancelJourneyInformation(markerEvent)
      ongoingJourney=false;
    });
  }
}

function addNewStartJourneyInformation(e) {
  /*var journeyData = {
    "destinationLat": 0,
    "destinationLong": 0,
    "mode": "self",
    "command": "string"
  };
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/journeys",
    //dataType:"text",
    accept: "application/json",
    contentType: "application/json",
    data: {
      "destinationLat": 0,
      "destinationLong": 0,
      "mode": "string",
      "command": "string"
    },
    //  url: "http://127.0.0.1:5002/image?path=" + imagePath,
    success: function (data) {
      console.log("journey Saved");
    },
    error: function (jqXHR, status, err) {
      console.log(err)
      console.log(jqXHR);
      console.log(status)
      alert("Error when receiving the data from external server");

    },
  })*/

  let latitude = e.latlng.lat;
  let longitude = e.latlng.lng;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://127.0.0.1:3000/journeys",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Postman-Token": "b33dda5d-a324-4811-958d-252d2c0928ca"
    },
    "processData": false,
    "data": "{\n  \"destinationLat\": "+latitude.toString()+",\n  \"destinationLong\":"+ longitude.toString()+",\n  \"mode\": \"self\",\n  \"command\": \"start\"\n}"
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

function addCancelJourneyInformation(e) {
  let latitude = e.latlng.lat;
  let longitude = e.latlng.lng;
  $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    dataType: "text",
    processData: false,
    url: "http://127.0.0.1:3000/journeys",
    data: "{\n  \"destinationLat\":"+latitude+",\n  \"destinationLong\":"+longitude+",\n  \"mode\": \"self\",\n  \"command\": \"cancel\"\n}",
    //  url: "http://127.0.0.1:5002/image?path=" + imagePath,
    success: function (data) {
      console.log("journey Saved");
    },
    error: function (jqXHR, status, err) {
      alert("Error when receiving the data from external server");
    },
  })
}