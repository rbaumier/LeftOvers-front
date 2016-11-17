'use strict';

angular.module('App').controller('SignupCtrl', function($scope, APIService, store, $state) {
  $scope.dealer = {};
  $scope.user = {};
  navigator.geolocation.getCurrentPosition(function onSuccess(position) {
    $scope.dealer.geolocation = position.coords.longitude + ' ' + position.coords.latitude;
    $scope.user.geolocation = position.coords.longitude + ' ' + position.coords.latitude;
    $scope.$apply();
  }, function onError(error) {
    console.error('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  });

  $scope.signup = function(user) {}
});
