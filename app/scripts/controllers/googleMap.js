/**
 *
 * googleMapCtrl
 *
 */

angular
    .module('homer')
    .controller('googleMapCtrl', googleMapCtrl)

function googleMapCtrl($scope, $timeout, $http, $compile, $templateCache, $timeout) {
    $scope.mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(-3.987861111111111, -79.19679722222223),
        // Style for Google Maps
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.detallarEstacion = function (markerRoot){
      $http.get($scope.API_URI_ESTACIONES.DETAIL+ markerRoot.info.id).then(function(response){
        $scope.infoStation = response.data;
        $scope.$apply();
      });

      $scope.infoStation = markerRoot.info;
      $scope.infoWindow.open( $scope.myMap, markerRoot );
    };

    $scope.infoStation;
    $scope.TEMPLATE_INFO = 'templateInfo.html';

    $scope.infoWindow = new google.maps.InfoWindow();
    var compileElement = $compile($templateCache.get($scope.TEMPLATE_INFO))($scope);
    $scope.infoWindow.setContent(compileElement[0]);

    $http.get($scope.API_URI_ESTACIONES.ALL).then(function(response){
      $scope.estaciones = response.data;
      $scope.estaciones.forEach(function(item){
          if(item.latitud && item.longitud){
            var estLatLng = {lat: item.latitud, lng: item.longitud};
            var marker = new google.maps.Marker({
             position: estLatLng,
             map: $scope.myMap,
             title: item.descripcion,
             info:{
               id: item.id,
               nombre: item.nombre,
               descripcion: item.descripcion
             }
            });

            google.maps.event.addListener( marker, 'click', (function(markerRoot) {
              return function(){
                $scope.detallarEstacion(markerRoot);
              };
            })(marker));
          }
      });
    });

}
