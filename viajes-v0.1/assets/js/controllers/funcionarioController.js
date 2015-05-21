/**
 * Created by Owner on 9/29/2014.
 */
app.controller("funcionarioCTL", 
    ['$scope', '$http','$filter','InternalServices','$mdSidenav','userInfo'
    ,function ($scope, $http, $filter,InternalServices, $mdSidenav, userInfo) {

    $scope.viajes = window.viajes;
    $scope.funcionario = window.funcionario;
    $scope.toggleSidebar = false;
    $scope.totalViaticos = 0.0;
    $scope.orderField = 'fecha';
    $scope.isReversed = false;
    $scope.filterNacionales = true;
    $scope.filterInternacionales = true;

    for (var i=0;i<$scope.viajes.length;i++) {
        var el = $scope.viajes[i];
        $scope.totalViaticos += el.gasto_viatico;
        $scope.viajes[i].fecha = el.fecha_inicio_part;
        $scope.viajes[i].fecha_inicio_part = new Date($scope.viajes[i].fecha_inicio_part);
        $scope.viajes[i].fecha_fin_part = new Date($scope.viajes[i].fecha_fin_part);
    }

    $scope.filterTipo = function (item){
        if($scope.filterNacionales && $scope.filterInternacionales){
            return true;
        }else if($scope.filterNacionales && item.tipo_viaje == 'Nacional'){
            return true;
        }else if($scope.filterInternacionales && item.tipo_viaje == 'Internacional'){
            return true;
        }
        return false;
    };

    $scope.fbShare = function(url) {
        console.log(url);
        window.open(
        'https://www.facebook.com/sharer/sharer.php?u='+url, 
        'facebook-share-dialog', 
        'width=520,height=350'); 
        return false;
    };

    $scope.startRadialD3 = function(){
        var daysPercentage = InternalServices.setDataViajesDias($scope.viajes);

        var rp1 = radialProgress(document.getElementById('radial-one'))
            .diameter(150)
            .value(daysPercentage.percentageDays1)
            .label('De viaje')
            .render();

        var rp2 = radialProgress(document.getElementById('radial-two'))
            .diameter(150)
            .value(daysPercentage.percentageDays2)
            .label('En casa')
            .render();

        //$scope.addTextRadial('radial-international-trips','Internacionales');
        //$scope.addTextRadial('radial-rnational-trips','Nacionales');

    };

    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.viajes.length; i++){
            var viaje = $scope.viajes[i];
            total += viaje.gasto_total;
        }
        return total;
    };

    $scope.getDateString = function(viaje){
        var inicio = viaje.fecha_inicio_part;
        var fin = viaje.fecha_fin_part;
        var inicioAux = $filter('date')(inicio, 'longDate');
        var finAux = $filter('date')(fin, 'longDate');
        return inicioAux + " al " + finAux;
    };

    $scope.getTravelDays = function(viaje){
        var dia = 24*60*60*1000;
        var inicio = new Date(viaje.fecha_inicio_part);
        var fin = new Date(viaje.fecha_fin_part);
        var diff = inicio - fin == 0 ? 1 : Math.round(Math.abs((inicio.getTime() - fin.getTime())/(dia)));
        return diff;
    };

    $scope.setData = function() {
        var comprobados = 0;
        var sincomprobar = 0;
        var devuelto = 0;
        for (var i=0;i<$scope.viajes.length;i++) {
            var el = $scope.viajes[i];
            comprobados += el.viatico_comprobado;
            sincomprobar += el.viatico_sin_comprobar;
            devuelto += el.viatico_devuelto;
        }

        $scope.dataViaticos = [comprobados,sincomprobar,devuelto];
        $scope.labelsViaticos = ['Comprobados', 'Sin comprobar' , 'Devueltos'];
    };

    $scope.drawChartHorizontal = function(){
        var options = {
            scaleIntegersOnly: true,
            responsive: true,
            scaleGridLineColor : "rgb(255,255,255)",
            showTooltips:true,
            scaleLabel : "$<%=value%>",
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };
        $scope.setData();
        var barChartData = {
            labels : $scope.labelsViaticos,
            datasets : [
                {
                    fillColor : "#2f96e9",
                    strokeColor : "#2f96e9",
                    data : $scope.dataViaticos,
                },
            ]
        }
        var element = document.getElementById("chart-horizontal").getContext("2d");
        $scope.myLine = new Chart(element).Bar(barChartData,options);
    };

    $scope.drawDonutChart = function() {
        var options = {

        }
    }

    $scope.layers =  {
        baselayers: {
            xyz: {
                name: 'OpenStreetMap (XYZ)',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
                //layerOptions: {
                  //  attribution: '<a href="http://spaceshiplabs.com" target="_blank">Spaceshiplabs.com</a> | <a  target="_blank" href="http://gasolinapp.com">Gasolinapp.com</a>'
                //}
            }
        }
    };
    $scope.options = {
        attributionControl : true, 
        zoomControlPosition: 'bottomright',
        imagePath : '/bower_components/leaflet/dist/images/',
        zoomControl : false
    };

    $scope.mapCenter = {
        lng : -99.133208,
        lat : 19.4326077,
        zoom : 2,
    };

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
        var lat = args.leafletEvent.latlng.lat;
        var lng = args.leafletEvent.latlng.lng;
        var place = $scope.markers[args.markerName].message;
        place = $.parseHTML(place);
        place = place[2].innerHTML;
        $scope.loadViajes(place);
        /*$scope.mapCenter = {
            lng : lng,
            lat : lat,
            zoom : 4,
        };*/
    });

    $scope.leafIcon = {
        iconUrl: '../images/pin_mapa.png',
        iconSize:     [33, 46], // size of the icon
        iconAnchor:   [16, 36] // point of the icon which will correspond to marker's location
    };


    $scope.get_markers = function(){
        var markers = [];
        $scope.markers = [];
        var msg;
        $scope.viajes.forEach(function(marker){
                var parcialGastado = (parseInt(marker.gasto_pasaje,10) ? parseInt(marker.gasto_pasaje,10) : 0) + (parseInt(marker.gasto_viatico,10) ? parseInt(marker.gasto_viatico,10) : 0);
                var parcialGastadoStr = $filter('currency')(parcialGastado, '$');
                msg = '<p><strong>' + parcialGastadoStr +' MXP'+'</strong></p>Gasto hasta el dia de hoy de viajes en <span class="place">'
                      + marker.ciudad_destino + '</span>';
                markers.push({
                    lat: parseFloat(marker.destino_latitud),
                    lng: parseFloat(marker.destino_longitud),
                    message: msg,
                    icon : $scope.leafIcon
                });
        });
        $scope.markers = markers;
        /*if(markers.length == 1){
            var mark = markers[0];
            $scope.mapCenter = {
                lng : mark.lat,
                lat : mark.lng,
                zoom : 4
            }
        }*/
    };

    $scope.loadViajes = function(ciudad) {
        $scope.mapPlace = ciudad;
        $scope.toggleSidebar = true;

        $http({
                method: 'POST',
                url: '/home/viajesPorCiudadJson?ciudad=' + ciudad
            })
            .success(function(data){
                $scope.items = data;
            });
    };
    $scope.toggleFuncionario = function(funcionario){
        userInfo.toggleFuncionario(funcionario);
        $mdSidenav('comparaSidenav').toggle();
    }
    $scope.toggleAside = function(){
        $scope.toggleSidebar = !$scope.toggleSidebar;
    }

    $scope.startRadialD3();
    $scope.drawChartHorizontal();
    $scope.get_markers();
}]);

app.controller("listadoCTL", ['$scope', '$http','$filter','$mdSidenav','userInfo' ,function ($scope, $http, $filter, $mdSidenav, userInfo) {
    $scope.totalItems = window.count;
    $scope.currentPage = window.page;
    $scope.siteUrl = window.siteUrl;
    $scope.toggleFuncionario = function(funcionario){
        userInfo.toggleFuncionario(funcionario);
        $mdSidenav('comparaSidenav').toggle();
    }
    $scope.pageChanged = function(){
        window.location.href = $scope.siteUrl + "/funcionario/list?page=" + $scope.currentPage;
    }
}]);

app.controller("compararCTL", 
    ['$scope', '$http','$filter','InternalServices','userInfo','$mdSidenav' ,
    function ($scope, $http, $filter,InternalServices, userInfo, $mdSidenav) {
    //$scope.funcionarios = userInfo.getFuncionarios();
    $scope.quantity = 1;
    
    $scope.toggleSidebar = function(){
        $mdSidenav('comparaSidenav').toggle();
    }


    $scope.getTotal = function(viajes){
        var total = 0;
        for(var i = 0; i < viajes.length; i++){
            var viaje = viajes[i];
            total += viaje.gasto_total;
        }
        return total;
    };
    $scope.setDataViajes = function(viajes){

        var oneDay = 1000 * 60 * 60 * 24;
        var diff = oneDay * 218;
        $scope.day = Math.floor(diff / oneDay);

        var days = 0;

        viajes.map(function(viaje){
           var dateInicio = new Date(viaje.fecha_inicio_part);
           var dateFin = new Date(viaje.fecha_fin_part);
           var dateDiff = dateFin - dateInicio;
           var vacas = Math.floor(dateDiff / oneDay);
           days += days + vacas;
        });
        return days;
    };
    $scope.drawDonuts = function(){
        setTimeout(
            function(){
                var days1 = InternalServices.setDataViajesDias($scope.funcionarios[0].viajes);
                var days2 = InternalServices.setDataViajesDias($scope.funcionarios[1].viajes);

                var rp1 = radialProgress(document.getElementById('radial-one0'))
                    .diameter(150)
                    .value(days1.percentageDays1)
                    .label('De viaje')
                    .render();

                var rp2 = radialProgress(document.getElementById('radial-two0'))
                    .diameter(150)
                    .value(days1.percentageDays2)
                    .label('En casa')
                    .render();

                var rp3 = radialProgress(document.getElementById('radial-one1'))
                    .diameter(150)
                    .value(days2.percentageDays1)
                    .label('De viaje')
                    .render();

                var rp4 = radialProgress(document.getElementById('radial-two1'))
                    .diameter(150)
                    .value(days2.percentageDays2)
                    .label('En casa')
                    .render();

            },2000
        );

    }
    
    $scope.getFuncionarios = function(){
        var funcionariosids = [];
        var funcionarios = userInfo.getFuncionarios();
        angular.forEach(funcionarios.selected, function(f){
            console.log(f.id)
            funcionariosids.push(f.id);
        });
        
        var params = {ids: funcionariosids.join(",")};
        console.log(params);
        $http({method:'POST',url:'/funcionario/getFuncionarios',data:params}).then(function(response){
            $scope.funcionarios = response.data;
        });
        $scope.drawDonuts();
    };

    $scope.getFuncionarios();
}]);
