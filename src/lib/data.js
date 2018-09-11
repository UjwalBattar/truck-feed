/* global google:false */
var allTrucks = [];
const trucks = [];
const carts = [];
const offTheGrid = [];
const burritos = [];
const poke = [];
const hotdog = [];
const burger = [];
const fusion = [];
const coffee = [];
const icecream = [];
const lobster = [];
const noodles = [];
const seafood = [];
const sandwich = [];
const vegetarian = [];
const searchOptions = [];
const timings = [];

function getData(options) {
  const url = "https://data.sfgov.org/resource/6a9r-agq8.json?";
  let searchUrl = url + (options ? options.join("&") : "");
  fetch(searchUrl, {
    method: "GET"
  })
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(json) {
          allTrucks = [];
          sortData(json);
          initMap(allTrucks);
          truckIndex(allTrucks);
        });
      }
    })
    .catch(function(err) {
      console.log("Network request failed");
    });
}

function sortData(data) {
  data.forEach(truck => {
    if (truck && truck.fooditems && truck.status !== "REQUESTED") {
      let food = truck.fooditems.toLowerCase();
      if (truck.facilitytype === "Push Cart") carts.push(truck);
      if (truck.facilitytype === "Truck") trucks.push(truck);
      if (truck.applicant === "Off the Grid Services, LLC") {
        offTheGrid.push(truck);
      }
      if (food.includes("burritos")) burritos.push(truck);
      if (food.includes("poke")) poke.push(truck);
      if (food.includes("hot dog")) hotdog.push(truck);
      if (food.includes("burger")) burger.push(truck);
      if (food.includes("fusion")) fusion.push(truck);
      if (food.includes("coffee")) coffee.push(truck);
      if (food.includes("ice cream")) icecream.push(truck);
      if (food.includes("lobster")) lobster.push(truck);
      if (food.includes("noodle")) noodles.push(truck);
      if (food.includes("seafood")) seafood.push(truck);
      if (food.includes("sandwich")) sandwich.push(truck);
      if (food.includes("vegetarian")) vegetarian.push(truck);
      allTrucks.push(truck);
    }
  });
}

function fetchStands(data) {
  initMap(data);
  truckIndex(data);
}

const truckIndex = data => {
  const truckFeed = document.getElementById("truck-feed");

  while (truckFeed.firstChild) {
    truckFeed.firstChild.remove();
  }

  const ulTrucks = document.createElement("ul");
  ulTrucks.className = "truck-ul";
  const h1 = document.createElement("h1");
  h1.className = "list-header";
  h1.innerHTML = "List o' Trucks";
  truckFeed.append(h1);
  data.forEach(truckJSON => {
    const liTruck = document.createElement("li");
    liTruck.className = `truck-li`;
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    h3.innerHTML = `${truckJSON.applicant}`;
    p1.innerHTML =
      truckJSON.dayshours === undefined
        ? "Currently Unavailable"
        : `${truckJSON.dayshours}`;
    p2.innerHTML = `${truckJSON.fooditems}`;
    p3.innerHTML = `${truckJSON.address}`;
    liTruck.appendChild(h3);
    liTruck.appendChild(p1);
    liTruck.appendChild(p2);
    liTruck.appendChild(p3);

    ulTrucks.appendChild(liTruck);
  });
  truckFeed.append(ulTrucks);
};

let infowindow;
let markers = {};
function populateMarkers(data) {
  let latitude;
  let longitude;
  data.forEach(truck => {
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
    markers[truck.objectid] = marker;
  });
}

function setMapOnAll(map) {
  Object.values(markers).forEach(marker => {
    marker.setMap(map);
  });
}
function clearAllMarkers() {
  setMapOnAll(null);
}

let map;
function initMap(data) {
  const mapCenter = { lat: 37.74466335, lng: -122.4492648 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: mapCenter
  });
  // google.maps.event.addListener(map, "click", function(event) {
  //   alert(
  //     "Latitude: " +
  //       event.latLng.lat() +
  //       " " +
  //       ", longitude: " +
  //       event.latLng.lng()
  //   );
  // });
  populateMarkers(data);
}

getData(searchOptions);

// google.maps.event.addListener(map, "click", function(event) {
//   map.setCenter(
//     new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
//   );
// });

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
