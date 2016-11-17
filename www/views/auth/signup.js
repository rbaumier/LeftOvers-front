'use strict';

angular.module('App').controller('SignupCtrl', function($scope, APIService, AuthService, store, $state) {
  $scope.dealer = {};
  $scope.user = {};
  $scope.userErrors = '';

  navigator.geolocation.getCurrentPosition(function onSuccess(position) {
    $scope.dealer.geolocation = position.coords.longitude + ' ' + position.coords.latitude;
    $scope.user.geolocation = position.coords.longitude + ' ' + position.coords.latitude;
    $scope.$apply();
  }, function onError(error) {
    $scope.userErrors = 'code: ' + error.code + '\n' + 'message: ' + error.message + '\n';
  });

  function login(kindOfUser) {
    return function() {
      return AuthService.login(_.pick(kindOfUser, 'email', 'password')).then(function() {
        $state.go('deals');
      });
    }
  }

  $scope.createUser = function(user) {
    APIService.users.create(user).then(login(user)).catch(function(err) {
      $scope.userErrors = err;
    });
  }

  $scope.createDealer = function(dealer) {
    APIService.dealers.create(dealer).then(login(dealer)).catch(function(err) {
      $scope.userErrors = err;
    });
  }
});
