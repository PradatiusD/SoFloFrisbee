'use strict';

//Setting up route
angular.module('mean.locations').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all locations', {
        url: '/locations',
        templateUrl: 'locations/views/list.html',
      })
      .state('create location', {
        url: '/locations/create',
        templateUrl: 'locations/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit location', {
        url: '/locations/:locationId/edit',
        templateUrl: 'locations/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('location by id', {
        url: '/locations/:locationId',
        templateUrl: 'locations/views/view.html'
      });
  }
]);
