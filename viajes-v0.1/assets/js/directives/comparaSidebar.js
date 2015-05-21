(function () {
    var controller = function ($scope, $mdSidenav,userInfo) {
        
        //Agregamos un listener a nuestro service para mantener nuestros datos actualizados
        $scope.funcionarios = userInfo.getFuncionarios();

        userInfo.addListener($scope);
        $scope.$on('userInfo.funcionariosChange',function(e,funcionarios){
            $scope.funcionarios = userInfo.getFuncionarios();
        });

        $scope.selectSchool = function(funcionario){
            userInfo.toggleFuncionario(funcionario);
        }

        $scope.isSelected = function(funcionario){
            return userInfo.isSelected(funcionario);
        }

        $scope.close = function() {
            $mdSidenav('comparaSidenav').close();
        };

        $scope.toggleFuncionario = function(funcionario){
            userInfo.toggleFuncionario(funcionario);
        }
        $scope.toggleComparador = function() {
            $mdSidenav('comparaSidenav').toggle();
        };
    };
    controller.$inject = ['$scope','$mdSidenav','userInfo'];
    var directive = function () {
        return {
            controller : controller,
            scope : {
                //model : '=',
            },
            templateUrl : 'comparaSidebar.html'
        };
    };
    app.directive('comparaSidebar', directive);

}());