/*Crear base de datos nueva*/

/*Crear tablas*/
CREATE TABLE `viajes_dump` (
	`UR` VARCHAR(100) NULL DEFAULT NULL,
	`UR_Siglas` VARCHAR(100) NULL DEFAULT NULL,
	`Nom_SP` VARCHAR(100) NULL DEFAULT NULL,
	`No_Emp` VARCHAR(100) NULL DEFAULT NULL,
	`Cargo` VARCHAR(100) NULL DEFAULT NULL,
	`NivelCargo` VARCHAR(100) NULL DEFAULT NULL,
	`Estatus` VARCHAR(100) NULL DEFAULT NULL,
	`Correo` VARCHAR(100) NULL DEFAULT NULL,
	`Genero` VARCHAR(100) NULL DEFAULT NULL,
	`ObservacionesSP` VARCHAR(100) NULL DEFAULT NULL,
	`Nombre_Evento` VARCHAR(400) NULL DEFAULT NULL,
	`FechaInicio` VARCHAR(100) NULL DEFAULT NULL,
	`FechaFin` VARCHAR(100) NULL DEFAULT NULL,
	`URL_Evento` VARCHAR(200) NULL DEFAULT NULL,
	`Organizador_Evento` VARCHAR(500) NULL DEFAULT NULL,
	`SiglasOrganizador_Evento` VARCHAR(100) NULL DEFAULT NULL,
	`PaisDestino` VARCHAR(100) NULL DEFAULT NULL,
	`EstadoDestino` VARCHAR(100) NULL DEFAULT NULL,
	`CiudadDestino` VARCHAR(100) NULL DEFAULT NULL,
	`ObservacionesEvento` VARCHAR(100) NULL DEFAULT NULL,
	`Num_Comision` VARCHAR(100) NULL DEFAULT NULL,
	`MecanismoCom` VARCHAR(100) NULL DEFAULT NULL,
	`InvitaSolicita` VARCHAR(500) NULL DEFAULT NULL,
	`UR_Nombre` VARCHAR(100) NULL DEFAULT NULL,
	`Obj_Estrategico` VARCHAR(300) NULL DEFAULT NULL,
	`Obj_Especifico` VARCHAR(500) NULL DEFAULT NULL,
	`Tema` VARCHAR(100) NULL DEFAULT NULL,
	`Motivo` TEXT NULL,
	`Antecedentes` TEXT NULL,
	`TipoViaje` VARCHAR(100) NULL DEFAULT NULL,
	`TipoRepresentaciomn` VARCHAR(100) NULL DEFAULT NULL,
	`TipoComision` VARCHAR(100) NULL DEFAULT NULL,
	`PaisOrigen` VARCHAR(100) NULL DEFAULT NULL,
	`EstadoOrigen` VARCHAR(100) NULL DEFAULT NULL,
	`CiudadOrigen` VARCHAR(100) NULL DEFAULT NULL,
	`FechaInicioParticipacion` VARCHAR(200) NULL DEFAULT NULL,
	`FechaFinParticipacon` VARCHAR(200) NULL DEFAULT NULL,
	`InstitucionPasaje` VARCHAR(200) NULL DEFAULT NULL,
	`InstitucionHospedaje` VARCHAR(200) NULL DEFAULT NULL,
	`InstitucionViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`NoAcuerdo` VARCHAR(200) NULL DEFAULT NULL,
	`NoOficio` VARCHAR(200) NULL DEFAULT NULL,
	`Partida` VARCHAR(200) NULL DEFAULT NULL,
	`TipoPasaje` VARCHAR(200) NULL DEFAULT NULL,
	`AerolineaSalida` VARCHAR(200) NULL DEFAULT NULL,
	`NumVueloCorridaSalida` VARCHAR(200) NULL DEFAULT NULL,
	`FechaSalida` VARCHAR(200) NULL DEFAULT NULL,
	`AerolineaLlegada` VARCHAR(200) NULL DEFAULT NULL,
	`NumVueloCorridaLlegada` VARCHAR(200) NULL DEFAULT NULL,
	`FechaLlegada` VARCHAR(200) NULL DEFAULT NULL,
	`SolicitudCambio` VARCHAR(200) NULL DEFAULT NULL,
	`FechaSolicitudVuelo` VARCHAR(200) NULL DEFAULT NULL,
	`FechaCambioVuelo` VARCHAR(200) NULL DEFAULT NULL,
	`MotivoCambio` VARCHAR(200) NULL DEFAULT NULL,
	`MontoCambio` VARCHAR(200) NULL DEFAULT NULL,
	`EstatusViaje` VARCHAR(50) NULL DEFAULT NULL,
	`GastoPasaje` VARCHAR(100) NULL DEFAULT NULL,
	`PartidaPresupuestaria` VARCHAR(200) NULL DEFAULT NULL,
	`FechaInicioViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`FechaFinViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`Moneda` VARCHAR(200) NULL DEFAULT NULL,
	`ValorTipoCambio` VARCHAR(200) NULL DEFAULT NULL,
	`Homologacion` VARCHAR(200) NULL DEFAULT NULL,
	`Reintegro` VARCHAR(50) NULL DEFAULT NULL,
	`TarifaZona` VARCHAR(50) NULL DEFAULT NULL,
	`TarifaViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`DiasViaticados` VARCHAR(200) NULL DEFAULT NULL,
	`MontoViaticados` VARCHAR(200) NULL DEFAULT NULL,
	`Observaciones` VARCHAR(200) NULL DEFAULT NULL,
	`Actividades_realizadas` VARCHAR(1200) NULL DEFAULT NULL,
	`Resultados` VARCHAR(1000) NULL DEFAULT NULL,
	`ContribucionesIFAI` TEXT NULL,
	`Link` VARCHAR(200) NULL DEFAULT NULL,
	`NombreHotel` VARCHAR(200) NULL DEFAULT NULL,
	`FechaEntrada_1` VARCHAR(200) NULL DEFAULT NULL,
	`FechaSalida_1` VARCHAR(200) NULL DEFAULT NULL,
	`CostoHospedaje` VARCHAR(100) NULL DEFAULT NULL,
	`MontoComprobado` DECIMAL(10,2) NULL DEFAULT NULL,
	`MontoSinComprobar` DECIMAL(10,2) NULL DEFAULT NULL,
	`MontoDevuelto` DECIMAL(10,2) NULL DEFAULT NULL,
	`CasoViaticos` TINYINT(4) NULL DEFAULT NULL,
	`ObservacionesMontoDevuelto` VARCHAR(100) NULL DEFAULT NULL,
	`GastoTotalViaticos` DECIMAL(10,2) NULL DEFAULT NULL,
	`GastoPasajeYViaticos` DECIMAL(10,2) NULL DEFAULT NULL
)
COMMENT='test'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

CREATE TABLE `funcionario` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`institucion` VARCHAR(500) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`nombre` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`apellido_1` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`apellido_2` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`nombre_completo` VARCHAR(200) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`tipo_personal` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`cargo_nombre` VARCHAR(150) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`cargo_nombre_superior` VARCHAR(150) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`unidad_administrativa` VARCHAR(100) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`clave_puesto` VARCHAR(100) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`nombre_puesto` VARCHAR(100) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`email` VARCHAR(100) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`genero` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`no_empleado` INT(11) NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	FULLTEXT INDEX `nombre_completo` (`nombre_completo`)
)
COLLATE='utf8_general_ci'
ENGINE=MyISAM
AUTO_INCREMENT=1;

CREATE TABLE `subscripcion` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`funcionario` INT(11) NOT NULL,
	`email` VARCHAR(200) NOT NULL,
	`lastUpdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`funcionario`, `email`),
	INDEX `id` (`id`)
)
COMMENT='tabla de subscripciones a actualizaciones de funcionarios'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


CREATE TABLE `viaje` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`mec_origen` VARCHAR(100) NOT NULL,
	`institucion_genera` VARCHAR(1500) NOT NULL,
	`UR` VARCHAR(100) NOT NULL,
	`tipo_rep` VARCHAR(100) NOT NULL,
	`consecutivo` VARCHAR(100) NOT NULL,
	`nombre` VARCHAR(100) NOT NULL,
	`cargo` VARCHAR(100) NOT NULL,
	`grupo` VARCHAR(100) NOT NULL,
	`tipo_viaje` VARCHAR(100) NOT NULL,
	`acuerdo` VARCHAR(100) NOT NULL,
	`oficio` VARCHAR(100) NOT NULL,
	`pais_origen` VARCHAR(100) NOT NULL,
	`estado_origen` VARCHAR(100) NOT NULL,
	`ciudad_origen` VARCHAR(100) NOT NULL,
	`pais_destino` VARCHAR(100) NOT NULL,
	`estado_destino` VARCHAR(100) NOT NULL,
	`ciudad_destino` VARCHAR(100) NOT NULL,
	`tarifa_diaria` VARCHAR(100) NOT NULL,
	`moneda` VARCHAR(100) NOT NULL,
	`tema` VARCHAR(100) NOT NULL,
	`tipo_com` VARCHAR(100) NOT NULL,
	`evento` VARCHAR(500) NOT NULL,
	`evento_url` VARCHAR(100) NOT NULL,
	`motivo` TEXT NOT NULL,
	`antecedente` VARCHAR(500) NOT NULL,
	`actividad` TEXT NOT NULL,
	`resultado` VARCHAR(500) NOT NULL,
	`contribucion_ifai` TEXT NOT NULL,
	`url_comunicado` VARCHAR(100) NOT NULL,
	`pasaje_cubre` VARCHAR(100) NOT NULL,
	`pasaje_tipo` VARCHAR(100) NOT NULL,
	`linea_origen` VARCHAR(100) NOT NULL,
	`vuelo_origen` VARCHAR(100) NOT NULL,
	`linea_regreso` VARCHAR(100) NOT NULL,
	`vuelo_regreso` VARCHAR(100) NOT NULL,
	`gasto_pasaje` DECIMAL(14,2) NULL DEFAULT NULL,
	`gasto_viatico` DECIMAL(14,2) NULL DEFAULT NULL,
	`gasto_total` DECIMAL(14,2) NOT NULL,
	`inst_hospedaje` VARCHAR(100) NULL DEFAULT NULL,
	`hotel` VARCHAR(100) NULL DEFAULT NULL,
	`fecha_inicio_part` DATE NULL DEFAULT NULL,
	`fecha_fin_part` DATE NULL DEFAULT NULL,
	`fecha_inicio_com` DATE NULL DEFAULT NULL,
	`fecha_fin_com` DATE NULL DEFAULT NULL,
	`fecha_inicio_hotel` DATE NULL DEFAULT NULL,
	`fecha_fin_hotel` DATE NULL DEFAULT NULL,
	`costo_hotel` VARCHAR(100) NULL DEFAULT NULL,
	`viatico_comprobado` DECIMAL(10,0) NULL DEFAULT NULL,
	`viatico_sin_comprobar` DECIMAL(10,0) NULL DEFAULT NULL,
	`viatico_devuelto` DECIMAL(10,0) NULL DEFAULT NULL,
	`observaciones` VARCHAR(100) NULL DEFAULT NULL,
	`funcionario` INT(11) NOT NULL DEFAULT '0',
	`origen_latitud` VARCHAR(100) NULL DEFAULT NULL,
	`origen_longitud` VARCHAR(100) NULL DEFAULT NULL,
	`destino_latitud` VARCHAR(100) NULL DEFAULT NULL,
	`destino_longitud` VARCHAR(100) NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	FULLTEXT INDEX `nombre` (`nombre`)
)
COLLATE='utf8_general_ci'
ENGINE=MyISAM
AUTO_INCREMENT=1;

/*Importar la base de datos*/

/*Ejecutar despues de la importada de datos */

insert into funcionario (institucion,nombre_completo,no_empleado) 
select distinct 'IFAI',Nom_SP,No_Emp
from viajes_dump;

update funcionario f
left join viajes_dump v on No_Emp = no_empleado 
set cargo_nombre = Cargo,tipo_personal = NivelCargo,email = Correo,f.genero = v.Genero;

insert into viaje (mec_origen,institucion_genera,UR,tipo_rep,consecutivo,nombre,tipo_viaje,acuerdo,oficio,pais_origen,estado_origen,ciudad_origen,pais_destino,estado_destino,ciudad_destino,tarifa_diaria,moneda,tema,tipo_com,evento,evento_url,motivo,antecedente,actividad,resultado,contribucion_ifai,url_comunicado,pasaje_cubre,pasaje_tipo,linea_origen,vuelo_origen,linea_regreso,vuelo_regreso,gasto_pasaje,gasto_viatico,gasto_total,inst_hospedaje,hotel,fecha_inicio_part,fecha_fin_part,fecha_inicio_com,fecha_fin_com,fecha_inicio_hotel,fecha_fin_hotel,costo_hotel,viatico_comprobado,viatico_sin_comprobar,viatico_devuelto,observaciones) 
select MecanismoCom,Organizador_Evento,UR,TipoRepresentaciomn,Num_comision,Nom_SP,TipoViaje,NoAcuerdo,NoOficio,PaisOrigen,EstadoOrigen,CiudadOrigen,PaisDestino,EstadoDestino,CiudadDestino,TarifaViaticos,Moneda,Tema,TipoComision,Nombre_Evento,URL_Evento,Motivo,Antecedentes,Actividades_realizadas,Resultados,ContribucionesIFAI,Link,InstitucionPasaje,TipoPasaje,AerolineaSalida,NumVueloCorridaSalida,AerolineaLlegada,NumVueloCorridaLlegada,CAST(replace(GastoPasaje, ',', '') AS DECIMAL(14,2)),CAST(replace(GastoTotalViaticos, ',', '') AS DECIMAL(14,2)),CAST(replace(GastoPasaje, ',', '') AS DECIMAL(14,2))+CAST(replace(GastoTotalViaticos, ',', '') AS DECIMAL(14,2)),InstitucionHospedaje,NombreHotel,STR_TO_DATE(FechaInicioParticipacion,'%m/%d/%Y'),STR_TO_DATE(FechaFinParticipacon,'%m/%d/%Y'),STR_TO_DATE(FechaInicioViaticos,'%m/%d/%Y'),STR_TO_DATE(FechaFinViaticos,'%m/%d/%Y'),STR_TO_DATE(FechaEntrada_1,'%m/%d/%Y'),STR_TO_DATE(FechaSalida_1,'%m/%d/%Y'),CostoHospedaje,MontoComprobado,MontoSinComprobar,MontoDevuelto,Observaciones
from viajes_dump;


update viaje v
left join funcionario f on
v.nombre = f.nombre_completo
set 
	v.funcionario = f.Id;
	
/*Querys de control*/	
	
select funcionario,nombre,fecha_inicio_part,count(*) as total 
from viaje 
group by funcionario,nombre,fecha_inicio_part
having count(*) > 1;

select linea_origen,count(*) as total 
from viaje 
where pasaje_tipo = 'Aéreo' and linea_origen != '' and linea_origen != 'No disponible' and linea_origen != 'Pendiente de captura' 
group by linea_origen;

select tipo_viaje,count(*) total from viaje group by tipo_viaje;

select MONTH(fecha_inicio_part) as mes,count(*) as total from viaje group by MONTH(fecha_inicio_part);

select count(*) as total from viaje group by MONTH(STR_TO_DATE(fecha_inicio_part,'%m/%d/%Y'));

select STR_TO_DATE(fecha_inicio_part,'%m/%d/%Y'),fecha_inicio_part from viaje order by STR_TO_DATE(fecha_inicio_part,'%m/%d/%Y') desc;


/*Correr script que actualiza las latitudes y longitudes , url_viajes/service/updateLongitudViajes */

