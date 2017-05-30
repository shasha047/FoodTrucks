var marker;
var map;
var appScope;
var markers = [];

function myMap() {

  var mapOptions = {
    center: new google.maps.LatLng(19.114112, 72.918085),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(19.114112, 72.918085),
    map: map,
    label: {
      color: 'blue',
      fontWeight: 'bold',
      text: 'QuezX is here',
    }
    // title: 'We are here'
  });

  var x = new google.maps.event.addListener(map, 'click', function (event) {
    // alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() );
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    console.log("latitude " + lat + " longitude " + lng);
    appScope.findtrucks(lat, lng);
    // marker.setlabel();
    //placeMarker(event.latLng);
  });

  // function placeMarker(location) {
  //     var marker = new google.maps.Marker({
  //         position: location,
  //         map: map
  //     });
  // }

}

var app = angular.module('foodtrucks', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.hashPrefix('');

  $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'homeCtrl',
      });
});


// function showResult(result) {
//     document.getElementById('latitude').value = result.geometry.location.lat();
//     document.getElementById('longitude').value = result.geometry.location.lng();
// }

// function getLatitudeLongitude(callback, address) {

//     address = address || 'quezx mumbai';
//     // Initialize the Geocoder
//     geocoder = new google.maps.Geocoder();
//     if (geocoder) {
//         geocoder.geocode({
//             'address': address
//         }, function (results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 callback(results[0]);
//             }
//         });
//     }
// }


app.controller('homeCtrl', function ($scope, $http, $timeout) {

  appScope = $scope;

  $scope.getLoc = function (address) {
    console.log(address);


    $scope.address = address || 'quezx mumbai';
    //  getLatitudeLongitude(showResult, address)
    // // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode({
        'address': $scope.address
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // callback(results[0]);
          $timeout(function () {
            $scope.lat = results[0].geometry.location.lat();
            $scope.lng = results[0].geometry.location.lng();
            console.log("lat " + $scope.lat + " lng " + $scope.lng);
            // var new_marker_position = new google.maps.LatLng(lat, lng);
            // marker.setPosition(new_marker_position);
            // function mynewMap(){


            //  var newmapOptions = {
            //         center: new google.maps.LatLng($scope.lat, $scope.lng),
            //         zoom: 15,
            //         mapTypeId: google.maps.MapTypeId.ROADMAP
            //     }
            //     var newmap = new google.maps.Map(document.getElementById("map"), newmapOptions);
            //     var newmarker = new google.maps.Marker({
            //         position: new google.maps.LatLng($scope.lat, $scope.lng),
            //         map: map,
            //         label: {
            //             color: 'blue',
            //             fontWeight: 'bold',
            //             text: address,
            //         }
            //         // title: 'We are here'
            //     });
            // }
          });

        }
      });
    }
    alert('GeoLocation found\n now click search FoodTrucks');
  }

  $scope.findtrucks = function (lat, lng) {
    console.log("latitude " + lat + " longitude " + lng);
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var new_marker_position = new google.maps.LatLng(lat, lng);
    var latlng = {lat: new_marker_position.lat(), lng: new_marker_position.lng()};
    geocoder.geocode({'location': latlng}, function (results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(15);
          marker.setPosition(new_marker_position);
          var lbl = {color: 'blue', fontWeight: 'bold', text: results[1].formatted_address.split(",")[0]}
          marker.setLabel(lbl);
          map.setCenter(marker.getPosition())
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
    // var lat1=Math.floor(lat);
    // var lat2=Math.ceil(lat);
    // var lng1=Math.floor(lng);
    // var lng2=Math.ceil(lng);
    var lat1 = lat - 0.01;
    var lat2 = lat + 0.01;
    var lng1 = lng - 0.01;
    var lng2 = lng + 0.01;
    // console.log(lat1);
    // console.log(lat2);
    // console.log(lng1);
    // console.log(lng2);

    $http.get('trucks.json').then(function (response) {
      var ftdata = response.data.data;
      var counter = 0;
      var foundtrucks = {};
      var foundtrucksdata = [];
      // console.log(ftdata[0][22]);
      // console.log(ftdata[0][23]);

      for (i in ftdata) {
        if (lat1 <= ftdata[i][22] && lat2 >= ftdata[i][22] && lng1 <= ftdata[i][23] && lng2 >= ftdata[i][23]) {
          counter = counter + 1;
          // console.log(counter);
          // console.log(ftdata[i][19]);
          foundtrucksdata.push({
            "name": ftdata[i][9],
            "foodtype": ftdata[i][19],
            "lat": ftdata[i][22],
            "lng": ftdata[i][23]
          });
        }

        // console.log(i);
        // console.log(ftdata[i][22]);
        // console.log(ftdata[i][23]);
      }
      for (i in markers) {
        markers[i].setMap(null);
      }
      markers = [];
      for(i in foundtrucksdata) {
        markers.push(new google.maps.Marker({
          position: new google.maps.LatLng(foundtrucksdata[i].lat, foundtrucksdata[i].lng),
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          label: {
            color: 'blue',
            fontWeight: 'bold',
            text: foundtrucksdata[i].name,
          },
        }))
      }
      foundtrucks.foundtrucksdata = foundtrucksdata;
      if (foundtrucks) {
        console.log(foundtrucks.foundtrucksdata[0]);
        $scope.ftrucks = foundtrucks.foundtrucksdata;
        console.log($scope.ftrucks);
      }
      else if (foundtrucks == {}) {
        alert('No food trucks found nereby\n try with the different address');
      }

    });


  }


});

