'use strict';

var FB  = require('fb');
// var env = require('./../config/env/development').facebook;


/*
 * Name: Ultimate Frisbee Ft. Lauderdale
 * Address: 1150 G. Harold Martin Dr, Fort Lauderdale, FL 33304
 * ID: 1458319214390728
 */

// FB.api('/oauth/access_token?client_id='+env.clientID+'&client_secret='+env.clientSecret+'&grant_type=client_credentials', function(response) {
// console.log(response);
// });

// Need group email
FB.setAccessToken('CAACEdEose0cBAJhX5RBYNZB1aUKuaW9dQLfOZCYCE11URMwXkMlGFngEmNnIzTPArIK8o8x9J1GHfZAUNJKxu8oXfdbsR51rSnZCZB2xPE167pK9Sn0dJEjZAaiUM2IrzhhrLoEFAyGAuZAJJ65rqRZCxJqu76w3KVLbhU7kwuErZBZACJPIO7lHYrkdJjw1FiHvMBF1v10VVwDRDrwweP4ggd');

// Use http://lookup-id.com/ for facebook id lookup

FB.api('243109099041731/feed', function (res) {
  if (!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log(JSON.stringify(res, null, 4));
});