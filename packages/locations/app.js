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

  // We are adding a link to the main menu for all authenticated users
  
  Locations.menus.add({
    'roles': ['authenticated'],
    'title': 'Add New Location',
    'link': 'create location'
  });

  // Adding about page
  Locations.menus.add({
    'title': 'About',
    'link': 'about'
  });

  // Adding about page
  Locations.menus.add({
    'title': 'High School',
    'link': 'youth'
  });

  // Adding about page
  Locations.menus.add({
    'title': 'Broward League',
    'link': 'league'
  });


  Locations.aggregateAsset('js', 'test.js', {
    group: 'footer',
    weight: -1
  });


  Locations.aggregateAsset('css', 'locations.css');

  return Locations;
});
