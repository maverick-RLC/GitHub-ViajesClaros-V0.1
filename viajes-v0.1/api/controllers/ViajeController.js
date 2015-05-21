/**
 * Created by Owner on 9/29/2014.
 */
module.exports = {
    index : function(req,res){
        var id = req.param('id');
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        if (id) {
            Viaje.findOne({id : id}).populate('funcionario').exec(function(err,viaje){
                if (err) {
                    console.log(err);
                    res.forbidden();
                } else {
                    if(viaje){
                        Viaje.find({ evento : viaje.evento,fecha_inicio_part : viaje.fecha_inicio_part,ciudad_destino : viaje.ciudad_destino,funcionario : { '!' : viaje.funcionario.id } }).populate('funcionario').exec(function(err,viajesExtras) {
                            if (err) {
                                console.log(err);
                                res.forbidden();
                            }
                            res.view({ 
                                funcionario : viaje.funcionario,
                                viaje : viaje,
                                fullUrl : fullUrl,
                                viajes : viajesExtras,
                                title : 'Detalles del viaje de ' + viaje.funcionario.nombre_completo,
                                description : 'Consulta el viaje a '+viaje.ciudad_destino+' de '+viaje.funcionario.nombre_completo+' - @ifaimexico vía @viajesclaros #ViajesClaros'
                            });
                        });
                    }
                    else{
                        res.redirect('/');
                    }
                }
            });
        } else {
            res.forbidden();
        }
    },
    list : function(req,res) {
        var tipo_viaje = req.param('tipo_viaje');
        var ciudad_destino = req.param('ciudad_destino');
        var tema = req.param('tema');
        var tipo_com = req.param('tipo_com');
        var hotel = req.param('hotel');
        var pasaje_tipo = req.param('pasaje_tipo');
        var orden = /*req.param('orden') || */'gasto_total desc';
        var mes = req.param('mes');
        var page = req.param('p');
        var pageSize = 20;

        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        var asyncTasks = [];
        asyncTasks.push(function(cb){
            Viaje.query("select distinct pais_destino,ciudad_destino from viaje order by pais_destino,ciudad_destino",
                function(e,d){
                    if (e) res.json({ text : "error destinos",error : e });
                    destinos = d;
                    cb();
                });
        });
        asyncTasks.push(function(cb){
            Viaje.query("select distinct tema from viaje where tema != 'No disponible' order by tema",
                function(e,t){
                    if (e) res.json({ text : "error temas",error : e });
                    temas = t;
                    cb();
                });
        });
        asyncTasks.push(function(cb){
            Viaje.query("select distinct tipo_com from viaje where tipo_com != 'No disponible' order by tipo_com",
                function(e,c){
                    if (e) res.json({ text : "error tipo comisiones",error : e });
                    comisiones = c;
                    cb();
                });
        });

        asyncTasks.push(function(cb){
            Viaje.query("select distinct hotel from viaje where hotel != 'No disponible' order by hotel",
                function(e,h){
                    if (e) res.json({ text : "error tipo hoteles",error : e });
                    hoteles = h;
                    cb();
                });
        });

        var request = {};
        if (pasaje_tipo) {
            request.pasaje_tipo = pasaje_tipo;
        }
        if (ciudad_destino) {
            request.ciudad_destino = ciudad_destino;
        }
        if (tema) {
            request.tema = tema;
        }
        if (tipo_com) {
            request.tipo_com = tipo_com;
        }
        if (hotel) {
            request.hotel = hotel;
        }
        if (tipo_viaje) {
            request.tipo_viaje = tipo_viaje;
        }

        Viaje.find(request).exec(function(err,totalViajes){
            if (err) {
                console.log(err);
                return;
            }
            Viaje.find(request).paginate({page : page , limit : pageSize}).populate('funcionario').sort(orden).exec(function(err,viajes){
                if (err) {
                    console.log(err);
                    return;
                }
                async.parallel(asyncTasks,function(){
                    var catalog = {
                        destinos : destinos,
                        temas : temas,
                        comisiones : comisiones,
                        hoteles : hoteles
                    };

                    res.view({
                        viajes : viajes,
                        fullUrl : fullUrl,
                        title : 'Listado de viajes',
                        description : Common.viajesRequestToString(request),
                        search_request : request || {},
                        catalog : catalog,
                        pagination : { currentPage : page , total : totalViajes.length , pageSize : pageSize }
                    });
                });
            });
        });

    },
    searchtipo : function(req,res){
        var term = req.param('filtro');
        var title = '';
        if (term) {
            Viaje.find({ 'tipo_viaje' : { 'like' : "%" + term + "%" }}).exec(function(err,viajes) {
                if (err) console.log(err);
                if(viajes){
                    title = 'Todos los viajes ' + term + 'es';
                    res.view(
                        'viaje/search',
                        { viajes : viajes || [],term : term, title : title}
                    );
                }else{
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    },
    searchmedio : function(req,res){
        var term = req.param('filtro');
        var title = '';
        if (term) {
            Viaje.find({ 'pasaje_tipo' : { 'like' : "%" + term + "%" }}).exec(function(err,viajes) {
                if (err) console.log(err);
                if(viajes){
                    title = 'Todos los viajes ' + term + 's';
                    res.view(
                        'viaje/search',
                        { viajes : viajes || [],term : term, title : title}
                    );
                }else{
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    },
    search_hotel : function(req,res){
        var term = req.param('filtro');
        var title = '';
        var prefix = (term.indexOf('hotel') > -1) ? '' : 'hotel ';
        if (term) {
            Viaje.find({ 'hotel' : { 'like' : "%" + term + "%" }}).exec(function(err,viajes) {
                if (err) console.log(err);
                if(viajes){
                    title = 'Viajes en los que se ha usado el ' + prefix + term;
                    res.view(
                        'viaje/search',
                        { viajes : viajes || [],term : term, title : title}
                    );
                }else{
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    },
    search_ciudad : function(req,res){
        var term = req.param('filtro');
        var title = '';
        if (term) {
            Viaje.find({ 'ciudad_destino' : { 'like' : "%" + term + "%" }}).exec(function(err,viajes) {
                if (err) console.log(err);
                if(viajes){
                    title = 'Todos los viajes a ' + term;
                    res.view(
                        'viaje/search',
                        { viajes : viajes || [],term : term , title : title}
                    );
                }else{
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    }
};
