/* global google:false */

// let jsonData = [];
// document.getElementById("root")
// const url =
//   "https://data.sfgov.org/resource/6a9r-agq8.json?" +
//   $.param({ facilitytype: "Push Cart" });

// 37.7532161931827, -122.44207530175782
// let mapLat = 37.774929;
// let mapLng = -122.419416;

function fetchCarts() {
  searchOptions.push("facilitytype=Push Cart");
  getData(searchOptions);
  // console.log("sdfghjhgfdsdfgh"));
  searchOptions = [];
}
function fetchTrucks() {
  searchOptions.push("facilitytype=Truck");
  getData(searchOptions);
  // console.log("sdfghjhgfdsdfgh"));
  searchOptions = [];
}

function fetchOffTheGrid() {
  searchOptions.push("applicant=Off the Grid Services, LLC");
  getData(searchOptions);
  // console.log("sdfghjhgfdsdfgh"));
  searchOptions = [];
}

let searchOptions = [];
let jData;

function getData(options) {
  const url = "https://data.sfgov.org/resource/6a9r-agq8.json?";
  // debugger;
  let srch = url + (options ? options.join("&") : "");
  fetch(srch, {
    method: "GET"
  })
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(json) {
          // console.log(json);
          // debugger;
          console.log(json[2].fooditems);
          jData = json;
          initMap();
        });
      }
    })
    .catch(function(err) {
      console.log("Network request failed");
    });
}

let infowindow;
// 37.751586275 -122.447721511
function initMap() {
  const mapCenter = { lat: 37.751586275, lng: -122.447721511 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: mapCenter
  });

  if (jData) {
    let latitude;
    let longitude;
    jData.forEach(truck => {
      if (truck.location) {
        latitude = parseFloat(truck.location.coordinates[1]);
        longitude = parseFloat(truck.location.coordinates[0]);
      }
      let marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map
      });
      infowindow = new google.maps.InfoWindow();
      marker.addListener("mouseover", function() {
        infowindow.close();
        infowindow.setContent(truck.applicant);
        infowindow.open(marker.get("map"), marker);
      });
      // debugger;
      // addInfoWindow(marker, truck.applicant);
    });
  }
  google.maps.event.addListener(map, "click", function(event) {
    map.setCenter(
      new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
    );
    //   // debugger;
  });
}
getData(searchOptions);
// if (jData) {
//   initMap();
// }

// google.maps.event.addListener(map, "click", function(event) {
//   map.setCenter(
//     map.setCenter(
//       new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
//     )
//   );
//   // debugger;
// });

//
// function closeInfoWindows() {
//   google.maps.event.addListener("click", function() {
//     if (infowindow) {
//       infowindow.close();
//     }
//   });
// }

// function addInfoWindow(marker, message) {
//   // if (infowindow)
//   infowindow = new google.maps.InfoWindow({
//     content: message
//   });
//
//   marker.addListener("click", function() {
//     infowindow.close();
//     infowindow.open(marker.get("map"), marker);
//   });
// }

// function initMap() {
//  const jsonData = collectData();
//  console.log(“JSONDATA”, jsonData);
//  const center = {lat: 37.774929, lng: -122.419416};
//  const map = new google.maps.Map(document.getElementById(‘map’), {
//    zoom: 12,
//    center: center
//  });
// }
// .forEach(truck => truck.applicant)
//
// var contentString =
//   '<div id="content">' +
//   '<div id="siteNotice">' +
//   "</div>" +
//   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
//   '<div id="bodyContent">' +
//   "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
//   "sandstone rock formation in the southern part of the " +
//   "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
//   "south west of the nearest large town, Alice Springs; 450&#160;km " +
//   "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
//   "features of the Uluru - Kata Tjuta National Park. Uluru is " +
//   "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
//   "Aboriginal people of the area. It has many springs, waterholes, " +
//   "rock caves and ancient paintings. Uluru is listed as a World " +
//   "Heritage Site.</p>" +
//   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
//   "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
//   "(last visited June 22, 2009).</p>" +
//   "</div>" +
//   "</div>";
