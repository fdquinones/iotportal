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
  $http.get("http://200.0.29.38:8080/platform/api/public/meteorological/detail/5612ffceb25b022d1a971e93").then(function(response){
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
