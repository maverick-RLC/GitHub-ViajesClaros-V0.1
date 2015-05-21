/**
 * WidgetController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
module.exports = {
	index : function(req,res){
		res.view(null, {message: 'Login failed!', layout: 'widget/layout'});
	},
	hoteles : function(req,res){
		res.view(null, {message: 'Login failed!', layout: 'widget/layout'});
	},
	tipos_de_viajes : function(req,res){
		res.view(null, {message: 'Login failed!', layout: 'widget/layout'});
	},
	aerolineas : function(req,res){
		res.view(null, {message: 'Login failed!', layout: 'widget/layout'});
	},
	ciudades : function(req,res){
		res.view(null, {message: 'Login failed!', layout: 'widget/layout'});
	},
}