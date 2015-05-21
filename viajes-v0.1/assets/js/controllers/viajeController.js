/**
 * Created by Owner on 9/29/2014.
 */
app.controller("viajeCTL", 
    ['$scope', '$http','$filter', '$mdSidenav', 'userInfo' ,
    function ($scope, $http, $filter, $mdSidenav, userInfo) {
    $scope.viaje = window.viaje;
    $scope.funcionario = window.funcionario;
    $scope.flagResize = true;

    $scope.fbShare = function(url) {
        window.open(
        'https://www.facebook.com/sharer/sharer.php?u='+url, 
        'facebook-share-dialog', 
        'width=520,height=350'); 
        return false;
    };

    $scope.infoPanels = function(windowSize){
        if(($scope.flagResize !== false) && (windowSize < 1170) ){
            $('#viaje .info-box.panel .panel-collapse').each(function(){
                $(this).collapse('hide');
            });
            $scope.flagResize = false;
        }
        else if(($scope.flagResize !== true) && (windowSize > 1170)){
            $('#viaje .info-box.panel .panel-collapse').each(function(){
                $(this).collapse('show');
            });
            $scope.flagResize = true;
        }
    };
    
    $scope.toggleFuncionario = function(funcionario){
        userInfo.toggleFuncionario(funcionario);
        $mdSidenav('comparaSidenav').toggle();
    }

    $(document).ready(function(){
        var windowSize = $(window).width();
        $scope.flagResize = (windowSize<1170) ? true : false;
        $('#viaje .info-box.panel .panel-collapse').each(function(){
            $(this).collapse({'toggle':false});
        });
        $scope.infoPanels(windowSize);
        $('.menu-viaje li a').click(function(){
            var link = $(this);
            $( '#viaje .info-box' ).removeClass('selected');
            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top - 20
            }, 500 , function(){
                var hash = link.attr('href');
                $('#viaje ' + hash).addClass('selected');
            });
            return false;
        });
        /*Media queries*/

        $(window).resize(function(){
            clearTimeout( timerResize );
            var timerResize = setTimeout( function(){
                windowSize = $(window).width();
                $scope.infoPanels(windowSize);
            } , 200 );
        });
    });

}]);

app.controller("viajeSearchCTL", 
    ['$scope', '$http','$filter','$location', '$mdSidenav', 'userInfo' , 
    function ($scope, $http, $filter,$location, $mdSidenav, userInfo) {
    $scope.viajes = window.viajes;
    $scope.catalog = catalog;
    $scope.search_request = search_request;
    $scope.pagination = pagination;
    $scope.filter_option = -1;

    $scope.getDateString = function(viaje){
        var inicio = new Date(viaje.fecha_inicio_part);
        var fin = new Date(viaje.fecha_fin_part);
        var inicioAux = $filter('date')(inicio, 'longDate');
        var finAux = $filter('date')(fin, 'longDate');
        return inicioAux + " al " + finAux;
    };

    $scope.compare = function(funcionario){
        if(typeof funcionario.funcionario != 'undefined'){
            funcionario.id = funcionario.funcionario;
        }
        console.log(funcionario);
        comparator.setFuncionario(funcionario);
    };

    $scope.submit = function() {
        var test = buildUrl($location.absUrl().split('?')[0],$scope.search_request);
        window.location = test;
    };

    function forEachSorted(obj, iterator, context) {
        var keys = sortedKeys(obj);
        for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
        }
        return keys;
    }

    function sortedKeys(obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys.sort();
    }

    function buildUrl(url, params) {
        if (!params) return url;
        var parts = [];
        forEachSorted(params, function (value, key) {
            if (value == null || value == undefined) return;
            if (angular.isObject(value)) {
                value = angular.toJson(value);
            }
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        });
        return url + ((url.indexOf('?') == -1) ? '?' : '&') + parts.join('&');
    }

    $scope.destinoLabel = function(destino) {
        return destino.ciudad_destino + " , " + destino.pais_destino;
    };

    $scope.setFilterOption = function(index) {
        if ($scope.filter_option == index)
            $scope.filter_option = -1;
        else
            $scope.filter_option = index;
    };

    $scope.getFilterOption = function(index) {
        return $scope.filter_option == index;
    };

    $scope.pageChanged = function() {
        $scope.search_request.p = $scope.pagination.currentPage;
        var test = buildUrl($location.absUrl().split('?')[0],$scope.search_request);
        window.location = test;
    };
    
    $scope.toggleFuncionario = function(funcionario){
        userInfo.toggleFuncionario(funcionario);
        $mdSidenav('comparaSidenav').toggle();
    }

}]);