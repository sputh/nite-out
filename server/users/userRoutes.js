'use strict';

// userController houses relevant methods for handling requests
var userController = require('./userController.js');

module.exports = function(app) {

  // Here we define all relevant routes on /users
  // GET requests will be used for login, POST for
  // user creation and PUT to edit user data.
  app.route('/login')
    // console.log("im loggin in")
    // .get(userController.loginUser)
    // .put(userController.editUser)
    .post(userController.loginUser);

  app.route('/signup')
    // .get(userController.loginUser)
    // .put(userController.editUser)
    .post(userController.signupUser);
};