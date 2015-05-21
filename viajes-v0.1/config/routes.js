/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {
  
  // Custom routes here...
  '/': {
    controller: 'home'
  },
  '/datos': {
      controller : 'service',
      action : 'datos'
  },
  '/graficas': {
      controller : 'service',
      action : 'graficas'
  },
  '/viajes' : {
      controller : 'Viaje',
      action : 'list'
  },
  '/viaje/:id' : {
      controller : 'Viaje',
      action : 'index'
  },
  '/home/viajesJson' : {
      controller: 'home',
      action : 'viajesJson'
  },
  '/home/viajesPorCiudadJson' : {
      controller: 'home',
      action : 'viajesPorCiudadJson'
  },
  '/home/statisticsJson' : {
      controller: 'home',
      action : 'statisticsJson'
  },
  '/funcionario' : {
      controller: 'funcionario',
      action : 'index'
  },
  '/funcionario/search' : {
      controller: 'funcionario',
      action : 'search'
  },
  '/funcionario/list' : {
      controller: 'funcionario',
      action : 'list'
  },
  '/funcionario/search_autocomplete' : {
      controller: 'funcionario',
      action : 'search_autocomplete'
  },
  '/funcionario/comparar' : {
      controller: 'funcionario',
      action : 'comparar'
  },
  '/funcionario/getFuncionarios' : {
      controller: 'funcionario',
      action : 'getFuncionarios'
  },  
  '/funcionario/statisticsJson' : {
      controller : 'funcionario',
      action : 'statisticsJson'
  },
  '/funcionario/:id' : {
      controller : 'funcionario',
      action : 'index'
  },
  '/service/updateLongitudViajes' : {
      controller: 'service',
      action: 'updateLongitudViajes'
  },
  '/service/subscribe' : {
      controller: 'service',
      action: 'subscribe'
  },
    '/datos/funcionarios' : {
        controller: 'service',
        action: 'funcionarios_csv'
    },
    '/datos/viajes' : {
        controller: 'service',
        action: 'viajes_csv'
    }
  


  // If a request to a URL doesn't match any of the custom routes above,
  // it is matched against Sails route blueprints.  See `config/blueprints.js`
  // for configuration options and examples.

};
