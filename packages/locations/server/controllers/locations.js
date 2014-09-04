'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var _        = require('lodash');
var fbHelper = require('./facebook-helper');

/**
 * Find location by id
 */
exports.location = function(req, res, next, id) {
  Location.load(id, function(err, location) {
    if (err) return next(err);

    if (!location) return next(new Error('Failed to load location ' + id));
    req.location = location;
    next();      
  });
};

/**
 * Create an location
 */
exports.create = function(req, res) {
  var location = new Location(req.body);
  location.user = req.user;

  location.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the location'
      });
    }
    res.json(location);
  });
};

/**
 * Update an location
 */
exports.update = function(req, res) {
  var location = req.location;

  location = _.extend(location, req.body);

  location.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the location'
      });
    }
    res.json(location);

  });
};

/**
 * Delete an location
 */
exports.destroy = function(req, res) {
  var location = req.location;

  location.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the location'
      });
    }
    res.json(location);

  });
};

/**
 * Show an location
 */
exports.show = function(req, res) {
  res.json(req.location);
};

/**
 * List of locations
 */
exports.all = function(req, res) {
  Location.find().sort('-created').populate('user', 'name username').exec(function(err, locations) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the locations'
      });
    }

    // Also get the latest post
    fbHelper.getLatestPostfromPages(locations, function (latestPosts){

      // Add this array to the array for now
      locations.push(latestPosts);

      res.json(locations);
    });
  });
};
