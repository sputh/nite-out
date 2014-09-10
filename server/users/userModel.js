'use strict';

// Defining the user model and attaching several methods
// which handle password checking for existing users and
// hashing when registering new users.
var db = require('../config/sqlDbSchema.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  // Define the table to which the model belongs to (for Schema)
  tableName: 'users',
  hasTimestamps: false,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), 
      function(err, isMatch) {
        callback(isMatch);
      });
  },
  hashPassword: function()  {
    var cipher = Promise.promisify(bcrypt.hash);
    // return a promise - bookshelf will wait for the promise
    // to resolve before completing the create action
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});


//   hashPass: function(){
//     var db = this;
//     var password = this.get('password');
//     bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(password, salt, function(err, hash) {
//           db.set('password', hash).save();
//         });
//     });
//   }
  
// });

// Export the user model for use elsewhere.
module.exports = User;
