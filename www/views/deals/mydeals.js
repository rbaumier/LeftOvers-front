'use strict';

angular.module('App').controller('MyDealsCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, APIService) {
  var dealerId = '6400b93e-b568-4fa5-9b72-b9e72d5cd8bc';
  APIService.deals.getByDealerId(dealerId).then(function(deals) {
    $scope.deals = deals;
  });

  $scope.remove = function(deal) {
    APIService.deals.removeById(deal.id).then(function() {
      $scope.deals = _.reject($scope.deals, deal);
    })
    .catch(function(err) {
      console.error(err);
    });
  }
});
