'use strict';

// Setup our connection to the SQLite database
// that handles our user data.  
var sqlite = require('sqlite3').verbose();
// Verbose() should only be used in production mode
// to aid in debugging as it shows that stack trace
var knex = require('knex')(sql);

// Passing an instantiated knex instance.  Passing connection info
// directly to bookshelf is now deprecated.
var db = require('bookshelf')(knex);

// First check if the table exists, if it does not, create a new table
// within the database.
db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('email', 100).unique().notNullable();
      user.string('password', 100);
      user.string('first_name', 100);
      user.string('last_name', 100);
      user.timestamps();
    }).then(function() {
      console.log('users table created');
    });
  }
});

module.exports = db;