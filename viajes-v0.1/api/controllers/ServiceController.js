/**
 * Created by Owner on 9/27/2014.
 */
var async = require('async');
var request = require('request');
var moment = require('moment');
var json2csv = require('json2csv');

module.exports = {
    updateFuncionariosViajes: function (req, res) {
        Viaje.find({ funcionario: 0 }).exec(function (err, viajes) {
            async.forEach(viajes, function (viaje, callback) {
                var nombres = viaje.nombre.split(" ");
                var query = "select id,nombre_completo from funcionario where match (funcionario.nombre_completo) against ('+" + nombres.join(" +") + "' IN BOOLEAN MODE)";
                Funcionario.query(query, function (err, funcionarios) {
                    if (funcionarios.length) {
                        viaje.funcionario = funcionarios[0].id;
                        viaje.save(callback);
                    } else {
                        var funcionario = {
                            institucion: "INSTITUTO FEDERAL DE ACCESO A LA INFORMACIÓN Y PROTECCIÓN DE DATOS ORGANISMO AUTÓNOMO en proceso de reestructuración",
                            nombre_completo: viaje.nombre.toLowerCase()
                        };
                        Funcionario.create(funcionario).exec(function (err, fitem) {
                            viaje.funcionario = fitem.id;
                            viaje.save(callback);
                        });
                    }
                })
            }, function (err) {
                res.json(err);
            });
        });
    },

    updateLongitudViajes: function (req, res) {//de 10 en 10 por que de 20 crashea
        Viaje.find({ destino_latitud : null ,limit: 10}).exec(function (err, viajes) {
            var destino_latitud,destino_longitud;
            async.forEach(viajes, function (viaje, callback) {
                var url = "http://maps.google.com/maps/api/geocode/json?address=" + (viaje.ciudad_destino != 'No disponible' ? viaje.ciudad_destino : viaje.estado_destino) + "&components=country:" + viaje.pais_destino + (viaje.estado_destino != 'No disponible' ? ("|administrative_area:" + viaje.estado_destino) : "");
                request({ url: url, json: true }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        if (body.results && body.results.length > 0) {
                            destino_latitud = body.results[0].geometry.location.lat;
                            destino_longitud = body.results[0].geometry.location.lng;
                            Viaje.update({ ciudad_destino : viaje.ciudad_destino,estado_destino : viaje.estado_destino,pais_destino : viaje.pais_destino  },{ destino_latitud : destino_latitud, destino_longitud : destino_longitud}).exec(callback);
                        } else {
                            console.log("error :" + url);
                        }

                    }
                });
            }, function (err) {
                console.log("finish");
                res.json({text: "success!", err: err});
            });
        });
    },

    subscribe: function (req, res) {
        var email = req.param('email');
        var funcionario = req.param('funcionario');

        Subscription.findOne({ email: email,funcionario : funcionario }).exec(function (err, subscriptions) {
            if (subscriptions)
                return res.json({ text: "ya esta agregado" });
            if (err) {
                console.error(err);
                return res.json({text : "error"});
            }
            Subscription.create({ funcionario: funcionario, email: email }).exec(function (err, sub) {
                if (err) {
                    return console.error(err);
                }
                return res.json({ text: "agregado" });
            });
        });
    },

    datos: function (req, res) {
        return res.forbidden();
        var database = sails.config.connections['mysql-connection'].database;
        var query = "SELECT UPDATE_TIME FROM information_schema.tables WHERE TABLE_SCHEMA = '" + database + "' AND TABLE_NAME = 'viaje'";
        Viaje.query(query, function (err, viajeUpdateTime) {
            if (err) console.log(err);
            var query = "SELECT UPDATE_TIME FROM information_schema.tables WHERE TABLE_SCHEMA = '" + database + "' AND TABLE_NAME = 'funcionario'";
            Funcionario.query(query, function (err, funcionarioUpdateTime) {
                if (err) console.log(err);
                res.view({
                    viajeUpdateTime : moment(viajeUpdateTime[0].UPDATE_TIME).format("DD-MM-YYYY HH:mm"),
                    funcionarioUpdateTime : moment(funcionarioUpdateTime[0].UPDATE_TIME).format("DD-MM-YYYY HH:mm")});
            });
        });

    },

    graficas : function(req,res){
        res.view({});
    },

    funcionarios_json : function(req,res) {

    },

    funcionarios_csv : function(req,res) {
        return res.forbidden();
        Funcionario.find().exec(function(err, list){
            if (err) console.log(err);
            // Send a CSV response
            var config = {
                fields : ['institucion',
                    'nombre_completo',
                    'tipo_personal',
                    'cargo_nombre',
                    'unidad_administrativa',
                    'email'],
                data: list
            };

            json2csv(config, function(err, csv) {
                if (err) console.log(err);
                var filename = "funcionarios.csv";
                res.attachment(filename);
                res.end(csv, 'UTF-8');
            });

        });
    },

    viajes_csv : function(req,res) {
        return res.forbidden();
        Viaje.find().exec(function(err, list){
            if (err) console.log(err);
            // Send a CSV response
            var config = {
                fields : ['mec_origen',
                    'institucion_genera',
                    'UR',
                    'tipo_rep',
                    'consecutivo',
                    'nombre',
                    'cargo',
                    'grupo',
                    'tipo_viaje',
                    'acuerdo',
                    'oficio',
                    'pais_origen',
                    'estado_origen',
                    'ciudad_origen',
                    'pais_destino',
                    'estado_destino',
                    'ciudad_destino',
                    'tarifa_diaria',
                    'moneda',
                    'tema',
                    'tipo_com',
                    'evento',
                    'evento_url',
                    'motivo',
                    'antecedente',
                    'actividad',
                    'resultado',
                    'contribucion_ifai',
                    'url_comunicado',
                    'pasaje_cubre',
                    'pasaje_tipo',
                    'linea_origen',
                    'vuelo_origen',
                    'linea_regreso',
                    'vuelo_regreso',
                    'gasto_pasaje',
                    'gasto_viatico',
                    'inst_hospedaje',
                    'hotel',
                    'fecha_inicio_part',
                    'fecha_fin_part',
                    'fecha_inicio_com',
                    'fecha_fin_com',
                    'fecha_inicio_hotel',
                    'fecha_fin_hotel',
                    'costo_hotel',
                    'viatico_comprobado',
                    'viatico_sin_comprobar',
                    'viatico_devuelto',
                    'observaciones' ],
                data: list
            };

            json2csv(config, function(err, csv) {
                if (err) console.log(err);
                var filename = "viajes.csv";
                res.attachment(filename);
                res.end(csv, 'UTF-8');
            });

        });
    },

    viajes_json : function(req,res) {
        Viaje.find().exec(function(err, list){
            if (err) console.log(err);
            res.attachment();
        });
    },

    uploadFile : function(req,res) {
        if (req.param('token') == 'grannysontrannys')
            res.view({});
        else
            res.forbidden();
    },

    updateFromCSV : function(req,res) {
        if (req.param('token') != 'grannysontrannys') {
            return res.forbidden();
        }
        var dirSave = __dirname+'/../../assets/uploads/';
        var i = 0;
        var dateValue = new Date();
        var dateString = moment(dateValue);
        req.file('file').upload({saveAs:dateString + '.csv',dirname:dirSave,maxBytes:52428800},function(e,files){
            if(e) res.json({text : 'error'});
            if (files && files[0]) {
                var fileImported = files[0].filename;

                    if (err) console.log(err);
                    var lineList = fs.readFileSync(dirSave + dateString +".csv").toString().split('\n');
                    lineList.shift();
                    var schemaKeyList = ['UR','UR_Siglas','Nom_SP','No_Emp','Cargo','NivelCargo','Estatus','Correo','Genero','ObservacionesSP','Nombre_Evento','FechaInicio','FechaFin','Organizador_Evento',
                        'SiglasOrganizador_Evento','PaisDestino','EstadoDestino','CiudadDestino','ObservacionesEvento','Num_Comision','MecanismoCom','InvitaSolicita','UR_Nombre','Obj_Estrategico','Obj_Especifico',
                        'Tema','Motivo','Antecedentes','TipoViaje','TipoRepresentacion','TipoComision','PaisOrigen','EstadoOrigen','FechaInicioParticipacion','FechaFinParticipacion','InstitucionPasaje','InstitucionHospedaje',
                        'InstitucionViaticos','NoAcuerdo','NoOficio','Partida','TipoPasaje','AerolineaSalida','NumVueloCorridaSalida','FechaSalida','AerolineaLlegada','NumVueloCorridaLlegada','FechaLlegada',
                        'SolicitudCambio','FechaSolicitudVuelo','FechaCambioVuelo','MotivoCambio','MontoCambio','EstatusViaje','GastoPasaje','PartidaPresupuestaria','FechaInicioViaticos','FechaFinViaticos','Moneda','ValorTipoCambio',
                        'Homologacion','Reintegro','TarifaZona','TarifaViaticos','DiasViaticados','MontoViaticados','Observaciones','Actividades Realizadas','Resultados','ContribucionesIFAI','Link','NombreHotel','FechaEntrada','FechaSalida',
                        'CostoHospedaje','MontoComprobado','MontoSinComprobar','MontoDevuelto','CasoViaticos','ObservacionesMontoDevuelto','GastoTotalViatocs','GastoPasajeYViaticos'];

                    async.forEach(lineList,function(line,cb) {
                        var viaje = {};
                        line.split(',').forEach(function (entry, i) {
                            viaje[schemaKeyList[i]] = entry;
                        });

                        var waterfallTasks = [];
                        var funionario = {};
                        var _viaje = {};
                        var ciudad = {};

                        waterfallTasks.push(function(err,cb){
                            Funcionario.findOrCreate({ nombre_completo : viaje.Nom_SP },{ institucion : 'IFAI' , nombre_completo : viaje.Nom_SP , cargo_nombre : viaje.cargo,tipo_personal : viaje.NivelCargo,email : viaje.Correo,genero : viaje.Genero })
                                .exec(function(err,func){
                                    if (err) {
                                        cb(err);
                                    }
                                    funcionario = func;
                                    cb();
                                }
                            );
                        });

                        waterfallTasks.push(function(err,cb){
                            Ciudad.findOrCreate({ nombre : viaje.ciudad_destino,pais : viaje.pais_destino },{ nombre : viaje.ciudad_destino , estado : estado_destino, pais : pais_destino })
                                .exec(function(err,ciud){
                                    if (err) {
                                        cb(err);
                                    }
                                    ciudad = ciud;
                                    cb();
                                }
                            );
                        });

                        waterfallTasks.push(function(err,cb){
                            Viaje.findOrCreate({ nombre : viaje.ciudad_destino,pais : viaje.pais_destino },{ nombre : viaje.ciudad_destino , estado : estado_destino, pais : pais_destino })
                                .exec(function(err,ciud){
                                    if (err) {
                                        cb(err);
                                    }
                                    ciudad = ciud;
                                    cb();
                                }
                            );
                        });


                    }, function(err) {
                        if (err)
                            return res.json({ success : false , error : err});
                        return res.json({ success : true });
                    });
            }
        });
    },
};
