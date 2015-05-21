/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css',

  'bower_components/bootstrap/dist/css/bootstrap.min.css',
  'bower_components/leaflet/dist/leaflet.css',
  'bower_components/bootstrap-touch-carousel/dist/css/bootstrap-touch-carousel.css',
  'bower_components/perfect-scrollbar/min/perfect-scrollbar.min.css',
  'bower_components/leaflet.markerclusterer/dist/MarkerCluster.Default.css',
  'bower_components/leaflet.markerclusterer/dist/MarkerCluster.css',
  'bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.css',
  'bower_components/animate.css/animate.min.css',
  'bower_components/angular-material/angular-material.css',
  'bower_components/less-prefixer/prefixer.less',
  'bower_components/chosen/chosen.min.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Dependencies like sails.io.js, jQuery, or Angular
  // are brought in here
  'js/dependencies/**/*.js',

  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
  'bower_components/perfect-scrollbar/min/perfect-scrollbar.min.js',
  'bower_components/angular/angular.js',
  'bower_components/angular/angular-animate.min.js',
  'bower_components/hammerjs/hammer.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-cookies/angular-cookies.min.js',
  'bower_components/angular-aria/angular-aria.js',
  'bower_components/angular-material/angular-material.js',
  'bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js',
  'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
  'bower_components/bootstrap-touch-carousel/dist/js/bootstrap-touch-carousel.js',
  'bower_components/d3/d3.min.js',
  'bower_components/raphael/raphael-min.js',
  'bower_components/morris/morris.min.js',
  'bower_components/leaflet/dist/leaflet.js',
  'bower_components/leaflet.markerclusterer/dist/leaflet.markercluster.js',
  'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
  'bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js',
  'bower_components/chosen/chosen.jquery.js',
  'bower_components/angular-chosen-localytics/chosen.js',
  'bower_components/ng-file-upload/angular-file-upload-all.js',
  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
