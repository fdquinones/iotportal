/**
 *
 * nggridCtrl
 *
 */

angular
    .module('homer')
    .controller('landingCtrl', landingCtrl)

function landingCtrl($scope, $http) {
  $scope.buttonTitle = "INGRESO";
  $http.get($scope.API_URI_ESTACIONES.DETAIL_DETAIL).then(function(response){
    $scope.estacion = response.data;
    $scope.variables = [];
    console.log($scope.estacion);
    $scope.estacion.variables.forEach(function(item){
        if(item.codigoVariable == 'k' || item.codigoVariable == 'h' || item.codigoVariable == 'j'|| item.codigoVariable == 'i'){
          $scope.variables.push(item);
          console.log(item);
        }
    });
  });

}
