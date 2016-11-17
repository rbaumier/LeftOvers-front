'use strict';

angular.module('App').controller('DealerCtrl', function ($scope, $stateParams, APIService) {
  APIService.dealers.getById($stateParams.id).then(function(dealer) {
    $scope.dealer = dealer;
  });
  APIService.dealers.getRatingById($stateParams.id).then(function(ratings) {
    $scope.ratings = ratings;
    var mean = _.meanBy(ratings, 'note');
    $scope.avgRating = isNaN(mean) ? '?/5' : mean;

  });
	APIService.deals.getByDealerId($stateParams.id).then(function(deals) {
    $scope.deals = deals.deals;
  });
});


