/**
 *
 * googleMapCtrl
 *
 */

angular
    .module('homer')
    .controller('googleMapCtrl', googleMapCtrl)

function googleMapCtrl($scope, $timeout, $http) {
    $scope.mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(-3.987861111111111, -79.19679722222223),
        // Style for Google Maps
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $http.get("http://200.0.29.38:8080/platform/api/public/meteorological").then(function(response){
    //$http.get("http://localhost:1337/200.0.29.38:8080/platform/api/public/meteorological").then(function(response){
      $scope.estaciones = response.data;
      console.log($scope.estaciones);
      $scope.estaciones.forEach(function(item){
          var estLatLng = {lat: item.latitud, lng: item.longitud};
          var marker = new google.maps.Marker({
           position: estLatLng,
           map: $scope.myMap,
           title: item.descripcion
         });
      });
    });
}
