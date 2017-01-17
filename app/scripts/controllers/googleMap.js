/**
 *
 * googleMapCtrl
 *
 */

angular
    .module('homer')
    .controller('googleMapCtrl', googleMapCtrl)

function googleMapCtrl($scope, $timeout, $http, $compile, $templateCache, $timeout, $location, $anchorScroll) {
    $scope.mapOptions = {
      /*  zoom: 6,
        center: new google.maps.LatLng(-3.987861111111111, -79.19679722222223),*/
        // Style for Google Maps
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.detallarEstacion = function (markerRoot){
      $scope.infoStation = markerRoot.info;
      $http.get($scope.API_URI_ESTACIONES.DETAIL+ markerRoot.info.id).then(function(response){
        $scope.infoStation = response.data;
      });
      $scope.infoWindow.open( $scope.myMap, markerRoot );
    };

    $scope.scrollTo = function(div) {
        $location.hash(div);
        $anchorScroll();
    };

    $scope.infoStation;
    $scope.TEMPLATE_INFO = 'templateInfo.html';

    $scope.infoWindow = new google.maps.InfoWindow();
    var compileElement = $compile($templateCache.get($scope.TEMPLATE_INFO))($scope);
    $scope.infoWindow.setContent(compileElement[0]);
    $scope.markesEstaciones = [];

    $http.get($scope.API_URI_ESTACIONES.ALL).then(function(response){
      $scope.estaciones = response.data;
      var latlngbounds = new google.maps.LatLngBounds();
	
	 console.log("----Estaciones que se presentan en el mapa--------");
      $scope.estaciones.forEach(function(item){
		  
          if(item.latitud && item.longitud && typeof item.latitud == 'number'  && typeof item.longitud == 'number'){
			console.log(item);
            var estLatLng = {lat: item.latitud, lng: item.longitud};
            var marker = new google.maps.Marker({
             position: estLatLng,
             map: $scope.myMap,
             animation: google.maps.Animation.DROP,
             title: item.descripcion,
             info:{
               id: item.id,
               nombre: item.nombre,
               descripcion: item.descripcion
             }
            });

            google.maps.event.addListener( marker, 'mousedown', (function(markerRoot) {
              return function(){
                $scope.detallarEstacion(markerRoot);
              };
            })(marker));

            $scope.markesEstaciones.push(marker);
            latlngbounds.extend(marker.getPosition());
          }
		  
		  
      });
	  console.log("----Estaciones que se presentan en el mapa--------");

      //agrupar estaciones
      var markerCluster = new MarkerClusterer($scope.myMap, $scope.markesEstaciones);

      // Don't zoom in too far on only one marker
      if (latlngbounds.getNorthEast().equals(latlngbounds.getSouthWest())) {
         var extendPoint1 = new google.maps.LatLng(latlngbounds.getNorthEast().lat() + 0.01, latlngbounds.getNorthEast().lng() + 0.01);
         var extendPoint2 = new google.maps.LatLng(latlngbounds.getNorthEast().lat() - 0.01, latlngbounds.getNorthEast().lng() - 0.01);
         latlngbounds.extend(extendPoint1);
         latlngbounds.extend(extendPoint2);
      }

      //centrar mapa en poligono
      $scope.myMap.fitBounds(latlngbounds);

    });

}
