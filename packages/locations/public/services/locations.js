'use strict';

//Locations service used for locations REST endpoint
angular.module('mean.locations').factory('Locations', ['$resource',
  function($resource) {
    return $resource('locations/:locationId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
