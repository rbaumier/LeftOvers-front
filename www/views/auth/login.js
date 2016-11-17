'use strict';

angular.module('App').controller('LoginCtrl', function($scope, $state, APIService, AuthService, store) {
  $scope.login = function(credentials) {
    AuthService.login(credentials).then(function(user) {
      $state.go('deals');
    }).catch(function(error) {
      $scope.errors = errors;
    });
  }
});
