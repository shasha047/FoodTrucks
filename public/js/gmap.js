//  function myMap() {
//                     // var myLatLng = {lat: -25.363, lng: 131.044};
        
//                     var mapOptions = {
//                         center: new google.maps.LatLng(19.114112, 72.918085),
//                         zoom: 15,
//                         mapTypeId: google.maps.MapTypeId.ROADMAP 
//                     }
//                     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//                     var marker = new google.maps.Marker({
//                         position: new google.maps.LatLng(19.114112, 72.918085),
//                         map: map,
//                         label: {
//                             color: 'blue',
//                             fontWeight: 'bold',
//                             text: 'QuezX is here',
//                         }
//                         // title: 'We are here'
//                         });
//                     var x = new google.maps.event.addListener(map, 'click', function( event ){
//                                     // alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
//                                     var lat = event.latLng.lat();
//                                     var lng = event.latLng.lng();
//                                     console.log("latitude " + lat + " longitude " + lng);
//                                     var geocoder = new google.maps.Geocoder;
//                                     var infowindow = new google.maps.InfoWindow;
//                                     var latlng = {lat:lat,lng:lng};
//                                     geocoder.geocode({'location':latlng},function(results,status){
//                                         if (status === 'OK') {
//                                             if (results[1]) {
//                                                 map.setZoom(15);
//                                                 var new_marker_position = new google.maps.LatLng(lat, lng);
//                                                 marker.setPosition(new_marker_position);
//                                                 var lbl= {color:'blue',fontWeight:'bold',text:results[1].formatted_address.split(",")[0]}
//                                                 marker.setLabel(lbl);
//                                                 // alert('Location found \n Now press search FoodTrucks');
//                                                 //  if(infowindow != null){
//                                                 //         infowindow.close();
//                                                 //  }
                                                
//                                                 // infowindow.setContent(results[1].formatted_address);
//                                                 // infowindow.open(map, marker);
//                                              } else {
//                                                 window.alert('No results found');
//                                              }
//                                         } else {
//                                             window.alert('Geocoder failed due to: ' + status);
//                                         }

//                                     });
                                    
//                                     // marker.setlabel();
//                                     //placeMarker(event.latLng);
//                                  });    

//                     // function placeMarker(location) {
//                     //     var marker = new google.maps.Marker({
//                     //         position: location, 
//                     //         map: map
//                     //     });
//                     // }

//                     }