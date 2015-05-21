/**
 * Created by Owner on 9/27/2014.
 */
module.exports = {
    connection : 'mysql-connection',
    schema : true,
    attributes : {
        id : {
            type : 'integer',
            primaryKey : true,
            unique : true
        },
        nombre : 'string',
        estado : 'string',
        pais : 'string',
        latitud : 'string',
        longitud : 'string'
    },
    afterCreate : function(ciudad,cb) {
        Common.getGoogleLatLong(ciudad,function(err,result){
            if (err) {
                console.log(err);
                cb();
            }
            ciudad.latitud = result.latitud;
            ciudad.longitud = result.longitud;
            console.log(ciudad);
            ciudad.save(cb);
        });

    }
};