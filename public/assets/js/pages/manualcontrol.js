$(document).ready(function () {
  $('#up-command').on('click', function (e) {
    journeyInformation("up")
  })
  $('#down-command').on('click', function (e) {
    journeyInformation("down")
  })
  $('#left-command').on('click', function (e) {
    journeyInformation("left")
  })
  $('#right-command').on('click', function (e) {
    journeyInformation("right")
  })
});

function journeyInformation(command) {

  let latitude = 0;
  let longitude = 0;
  $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    dataType: "text",
    processData: false,
    url: "/journeys",
    data: "{\n  \"destinationLat\":"+latitude+",\n  \"destinationLong\":"+longitude+",\n  \"mode\": \"manual\",\n  \"command\": \""+command+"\"\n}",
    success: function (data) {
      console.log("journey Saved");
    },
    error: function (jqXHR, status, err) {
      alert("Error when receiving the data from external server");
    },
  })
}