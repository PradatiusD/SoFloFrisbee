'use strict';

var async  = require('async');
var _      = require('lodash');
var FB     = require('fb');

FB.setAccessToken('648357831926176|gJdv17OllqcvxsjimLp9w2IA7oU');


exports.getFeedFromLocation = function (data, callback) {
  FB.api(data.facebookID + '/feed', function (fbRes) {

    if(!fbRes || fbRes.error) {
      console.log(!fbRes ? 'error occurred' : fbRes.error);
      return;
    }
    data.facebookData = fbRes;
    callback(data);
  });
};


exports.getLatestPostfromPages = function (locations, callback) {

  var asyncArray = [];

  // First asynchronously call all the data

  function createAsyncFn (location) {

    asyncArray.push(function (callback){
      exports.getFeedFromLocation(location, function (data) {
        callback(null, data);
      });
    });

  }

  for (var i = 0; i < locations.length; i += 1) {
    createAsyncFn(locations[i]);
  }

  // Now process and get the latest event
  async.parallel(asyncArray, function (err, locations){

    var posts = [];

    for (var i = 0; i < locations.length; i+= 1) {
      posts.push(locations[i].facebookData.data);
    }

    posts = _.flatten(posts, true);

    var latestPost = _.max(posts, function(post){
      return Date.parse(post.updated_time);
    });

    callback(latestPost);

  });
};