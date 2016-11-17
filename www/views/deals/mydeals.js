'use strict';

angular.module('App').controller('MyDealsCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, APIService, store) {
  var user = store.get('user');
  if(!user) return;

  APIService.deals.getByDealerId(user.id).then(function(dealer) {
    $scope.deals = dealer.deals;
  });

  APIService.dealers.getById(user.is).then(function(deals) {
    $scope.dealer = deals;
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
