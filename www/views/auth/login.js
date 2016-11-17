'use strict';

angular.module('App').controller('LoginCtrl', function($scope, $state, APIService, store) {
  $scope.login = function(credentials) {
    APIService.auth.login(credentials).then(function(user) {
      store.set('user', {
        id: user.id,
        token: user.token
      });
      $state.go('deals');
    }).catch(function(error) {
      console.error(error.data);
    });
  }
});
