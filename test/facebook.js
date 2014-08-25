'use strict';

var FB  = require('fb');
var env = require('./../config/env/development').facebook;


/*
 * Name: Ultimate Frisbee Ft. Lauderdale
 * Address: 1150 G. Harold Martin Dr, Fort Lauderdale, FL 33304
 * ID: 1458319214390728
 */

FB.api('/oauth/access_token?client_id='+env.clientID+'&client_secret='+env.clientSecret+'&grant_type=client_credentials', function(response) {
console.log(response);
});

// FB.setAccessToken('CAACEdEose0cBAL7v1ZA4WFDnGNwJUQbfAQ8HcCqZCkyBOdh6xsemB0xXaxdA7IGAcZAzJL1pi1MUCLllLCiWL5cGeQZCrOIhCFedtUg9Q9nurgGTK1sGNsbdLwqDk4qpncKH2lcKBWAMu7bq1wFAQ3ZBccmPljbmpyuAu7CSAb9y3VfMvCraNf4GjKJTEbEk6k8jX4Vwi9OoRZBlJLLOVZC');

// Use http://lookup-id.com/ for facebook id lookup

// FB.api('1458319214390728/feed', function (res) {
//   if(!res || res.error) {
//     console.log(!res ? 'error occurred' : res.error);
//     return;
//   }
//   console.log(JSON.stringify(res, null, 4));
// });