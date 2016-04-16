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
  $http.get("/platform/api/public/meteorological/detail/570bbdecf259eca2c20e7d72").then(function(response){
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
