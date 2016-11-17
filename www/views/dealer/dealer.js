'use strict';

angular.module('App').controller('DealerCtrl', function ($scope, $stateParams, APIService) {
	console.log($stateParams)
  APIService.dealers.getById($stateParams.id).then(function(dealer) {
    $scope.dealer = dealer;
  });
  APIService.dealers.getRatingById($stateParams.id).then(function(ratings) {
    console.log("ratings",ratings);
    $scope.ratings = ratings;
    $scope.avgRating = calculateAvgRating(ratings);

  });
	APIService.deals.getByDealerId($stateParams.id).then(function(deals) {
    $scope.deals = deals.deals;
  });


  var calculateAvgRating = function(el){
  	var noteMoy=0;
  	var number=0;
  	el.map(function(value){
  		if(value.note){
  			noteMoy+=value.note;
  			number++;
  		}
  	});
  	return (noteMoy / number).toFixed(1);
  }

});


