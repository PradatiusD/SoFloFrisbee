'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


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
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Location', LocationSchema);
