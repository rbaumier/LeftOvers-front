'use strict';

angular.module('App').controller('DealerCtrl', function ($scope, $stateParams, APIService) {
  APIService.dealers.getById($stateParams.id).then(function(dealer) {
  	console.log('dealer', JSON.stringify(dealer))
    $scope.dealer = dealer;
  });
});


