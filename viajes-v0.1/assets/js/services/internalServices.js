app.service('InternalServices',function(){
    this.setDataViajesDias = function(viajes){
        var oneDay = 1000 * 60 * 60 * 24;
        var diff = oneDay * 218;
        var day = Math.floor(diff / oneDay);

        var days = 0;

        viajes.map(function(viaje){
            var dateInicio = new Date(viaje.fecha_inicio_part);
            var dateFin = new Date(viaje.fecha_fin_part);
            var dateDiff = dateFin - dateInicio;
            var vacas = dateDiff == 0 ? 1 : Math.floor(dateDiff / oneDay);
            days += vacas;
        });
        return { percentageDays1 : ((days/day) * 100),percentageDays2 : ((day-days)/day) * 100 };
    };
});