'use strict';

angular.module('nite-out.authServices', [
  'ngStorage'
  ])
.controller('getUserName', function($scope, $localStorage) {
  $scope.storage = $localStorage.$default({
    user: 'Guest'
  });
});

.factory('AuthRequests', ['$http', '$window', 'Main', function($http, $window, Main) {
  // Token storage is handled by the server by sending back the token in a cookie

  var signup = function(userData) {
    // Empty the array using native angular method to allow for overwriting
    angular.copy([], resolved);

    return $http({
      method: 'POST',
      url: '/users',
      data: userData
    })
    // On successful response from the server, we want to set our current user,
    // save the token to localStorage and update our auth controller.
    .success(function(res) {
      Main.user = res.user;
    });
  };

  var userLogin = function(userData) {
    // Empty the array using native angular method to allow for overwriting
    angular.copy([], resolved);

    return $http({
      method: 'GET',
      url: '/users',
      params: userData
    })
    // Upon user verification, we set our current user, save the token
    // and update our auth controller.
    .success(function(res) {
      console.log("res: ", res);
      Main.user = res.user;
    });
  };

  var signout = function() {
    // Empty the resolved array, delete the token from localStorage and update
    // auth controller with new resolved state.
    $window.localStorage.removeItem('nite-out.user');
  };

  return {
    signout: signout,
    signup: signup,
    userLogin: userLogin
  };
}]);
