'use strict';

angular.module('App').controller('NewDealCtrl', function($scope, $state, APIService) {
  $scope.create = function(deal) {
    deal.dealer_id = '6400b93e-b568-4fa5-9b72-b9e72d5cd8bc';
    APIService.deals.create(deal)
      .then(function(res) {
        $state.go('mydeals');
      })
      .catch(function(err) {
        $scope.errors = err.data.message;
      });
  }
});
