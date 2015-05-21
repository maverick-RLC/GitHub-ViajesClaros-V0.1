(function () {
    var controller = function ($scope, $mdSidenav,userInfo,limitToFilter,$http,$window) {
        $scope.loadFuncionarios = function(name) {
            if (!name) return [];
            return $http({method:'POST',url:"/funcionario/search_autocomplete?nombre="+name}).then(function(response){
                return limitToFilter(response.data, 8);
            });
        };
        $scope.onSelectPart = function ($item, $model, $label) {
            if($scope.redirectOnClick){
                $window.location = '/funcionario/' + $item.id;
            }
            userInfo.toggleFuncionario($item);
            $scope.$item = $item;
            $scope.$model = $model;
            $scope.$label = $label;
        };
    };
    controller.$inject = ['$scope','$mdSidenav','userInfo','limitToFilter','$http','$window'];
    var directive = function () {
        return {
            controller : controller,
            scope : {
                redirectOnClick : '='
                //model : '=',
            },
            templateUrl : 'funcionariosTextSearch.html'
        };
    };
    app.directive('funcionariosTextSearch', directive);

}());