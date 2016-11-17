'use strict';

angular.module('App').controller('LoginCtrl', function($scope, APIService, store, $state) {
  $scope.login = function(user) {
    APIService.auth.login(user).then(function(token) {
      store.set('jwt', token);
      $state.go('deals');
    }).catch(function(error) {
      console.error(error.data);
    });
  }
});
