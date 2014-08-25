'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var FB       = require('fb');

FB.setAccessToken('648357831926176|gJdv17OllqcvxsjimLp9w2IA7oU');


/**
 * Location Schema
 */
var LocationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  facebookID: {
    type: String,
    required: false,
    trim: false
  },
  facebookData: {
    type: Object,
    required: false,
    trim: false
  },  
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
LocationSchema.path('name').validate(function(name) {
  return !!name;
}, 'Title cannot be blank');

LocationSchema.path('address').validate(function(address) {
  return !!address;
}, 'Address cannot be blank');

/**
 * Statics
 */


LocationSchema.statics.load = function(id, cb) {

  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(function(err, data) {

    if (data.facebookID) {
  
      FB.api(data.facebookID + '/feed', function (fbRes) {
        
        if(!fbRes || fbRes.error) {
          console.log(!fbRes ? 'error occurred' : fbRes.error);
          return;
        }
        
        data.facebookData = fbRes;
        cb(err, data);
      });

    }

    else {
      cb(err, data);    
    }

  });
};

mongoose.model('Location', LocationSchema);
