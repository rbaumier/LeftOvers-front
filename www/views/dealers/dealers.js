'use strict';

angular.module('App').controller('DealersCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, APIService) {
  APIService.dealers.get().then(function(dealers) {
    $scope.dealers = dealers;
  });
});
