/* global google:false */

let burritos = [];
let poke = [];
let hotdog = [];
let burger = [];
let fusion = [];
let coffee = [];
let icecream = [];
let lobster = [];
let noodles = [];
let seafood = [];
let sandwich = [];
let vegetarian = [];

let searchOptions = [];
let jData;

function getData(options) {
  const url = "https://data.sfgov.org/resource/6a9r-agq8.json?";
  let searchUrl = url + (options ? options.join("&") : "");
  fetch(searchUrl, {
    method: "GET"
  })
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(json) {
          // debugger;
          // console.log(json[2].fooditems);
          jData = json;

          jData.forEach(truck => {
            // debugger;
            if (truck && truck.fooditems) {
              let food = truck.fooditems.toLowerCase();
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
            }
          });

          initMap(jData);
        });
      }
    })
    .catch(function(err) {
      console.log("Network request failed");
    });
}
// CONVERT TO SWITCH STATEMENT
function fetchBurrito() {
  initMap(burritos);
}

function fetchPoke() {
  initMap(poke);
}

function fetchHotdog() {
  initMap(hotdog);
}
function fetchBurger() {
  initMap(burger);
}
function fetchFusion() {
  initMap(fusion);
}
function fetchCoffee() {
  initMap(coffee);
}
function fetchIcecream() {
  initMap(icecream);
}
function fetchLobster() {
  initMap(lobster);
}
function fetchNoodles() {
  initMap(noodles);
}
function fetchSeafood() {
  initMap(seafood);
}
function fetchSandwich() {
  initMap(sandwich);
}
function fetchVegetarian() {
  initMap(vegetarian);
}
// CONVERT TO SWITCH STATEMENT
function fetchAll() {
  searchOptions = [];
  getData(searchOptions);
  searchOptions = [];
}
function fetchCarts() {
  searchOptions.push("facilitytype=Push Cart");
  getData(searchOptions);
  searchOptions = [];
}
function fetchTrucks() {
  searchOptions.push("facilitytype=Truck");
  getData(searchOptions);

  searchOptions = [];
}
function fetchOffTheGrid() {
  searchOptions.push("applicant=Off the Grid Services, LLC");
  getData(searchOptions);
  searchOptions = [];
}

function populateMarkers(data) {
  // debugger;
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
  });
}

let map;
let infowindow;

function initMap(data) {
  const mapCenter = { lat: 37.751586275, lng: -122.447721511 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: mapCenter
  });
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
