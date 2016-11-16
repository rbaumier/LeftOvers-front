'use strict';

angular.module('App').controller('DealsCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, APIService) {
  APIService.deals.get().then(function(deals) {
    $scope.deals = deals;
  });
});
