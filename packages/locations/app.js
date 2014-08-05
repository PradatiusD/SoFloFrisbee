'use strict';

/*
 * Defining the Package
 */

var Module = require('meanio').Module;

var Locations = new Module('locations');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Locations.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Locations.routes(app, auth, database);

  Locations.menus.add({
    'title': 'Locations',
    'link': 'all locations'
  });

  // We are adding a link to the main menu for all authenticated users
  
  Locations.menus.add({
    'roles': ['authenticated'],
    'title': 'Add New Location',
    'link': 'create location'
  });

  Locations.aggregateAsset('js', 'test.js', {
    group: 'footer',
    weight: -1
  });


  Locations.aggregateAsset('css', 'locations.css');

  return Locations;
});
