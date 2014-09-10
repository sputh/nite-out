// Refactor database from mongo to sql
var Bookshelf = require('bookshelf');
// var mongoose = require('mongoose');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'default',
    password: 'password',
    database: 'apiRequests',
    charset: 'utf8',
    filename: path.join(__dirname, './data/apiRequests.sqlite')
  }
});

/************************************************************/
// Stored API calls
/************************************************************/

// Main content aggregation table
db.knex.schema.hasTable('movieZipcodes').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('movieZipcodes', function(content) {
      content.increments('aggregatedContentKey').primary();
      content.integer('sourceKey').unsigned().references('sourceKey').inTable('sources');
      content.string('title', 255);
      content.string('url', 255);
      content.string('content', 1000);
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function(table) {
      console.log('Created aggregatedContent', table);
    });
  }
});

// Zipcode represents the searched zipcode
// Results stores the returned results of the webscrape
// var MovieSchema = new mongoose.Schema({
//   zipcode: {
//     type: String,
//     required: true,
//     primary: true
//   },
//   results: Array
// });

module.exports = mongoose.model('Movies', MovieSchema);