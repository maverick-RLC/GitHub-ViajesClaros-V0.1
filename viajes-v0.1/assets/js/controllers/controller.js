
app.controller("subscribeCTL", ['$scope', '$http',function ($scope, $http) {
    $scope.funcionario = window.funcionario;
    $scope.email = "";
    $scope.submitForm = function() {
        var data = {
            email : $scope.email,
            funcionario : $scope.funcionario.id
        };
        $http({method: 'POST', url: '/service/subscribe',data : data}).success(function(data){
            console.log(data);
            //location.reload();//TODO mensaje mas amigable , no supe como cerrar modal con angular.
        });
    }
}]);
app.controller("lateralCTL", ['$scope', '$http','$mdSidenav',function ($scope, $http, $mdSidenav ) {
    $scope.toggleSidebar = function() {
        $mdSidenav('comparaSidenav').toggle();
    };
}]);
app.controller("headerCTL", ['$scope', '$http','$mdSidenav',function ($scope, $http, $mdSidenav ) {
    $scope.toggleSidebar = function() {
        $mdSidenav('comparaSidenav').toggle();
    };
}]);

app.controller('uploadFileCTL',['$scope','$http'],function($scope,$http) {
    //$scope.token = '';

});

