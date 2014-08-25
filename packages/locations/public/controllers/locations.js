'use strict';

angular.module('mean.locations').controller('LocationsController', ['$scope', '$stateParams', '$location', 'Global', 'Locations',

  function($scope, $stateParams, $location, Global, Locations) {
    $scope.global = Global;

    $scope.hasAuthorization = function(location) {
      if (!location || !location.user) return false;
      return $scope.global.isAdmin || location.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var location = new Locations({
          name: this.name,
          address: this.address,
          facebookID: this.facebookID
        });
        location.$save(function(response) {
          $location.path('locations/' + response._id);
        });

        this.name = '';
        this.address = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(location) {
      if (location) {
        location.$remove();

        for (var i in $scope.locations) {
          if ($scope.locations[i] === location) {
            $scope.locations.splice(i, 1);
          }
        }
      } else {
        $scope.location.$remove(function(response) {
          $location.path('locations');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var location = $scope.location;
        if (!location.updated) {
          location.updated = [];
        }
        location.updated.push(new Date().getTime());

        location.$update(function() {
          $location.path('locations/' + location._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Locations.query(function(location) {
        $scope.location = location;
      });
    };

    $scope.findOne = function() {
      Locations.get({
        locationId: $stateParams.locationId
      }, function(location) {
        $scope.location = location;
      });
    };
  }
]);
