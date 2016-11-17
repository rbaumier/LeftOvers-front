'use strict';

angular.module('App').controller('DealsCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, APIService) {
  APIService.deals.get().then(function(deals) {
  	deals.map(function(deal){
  		if(moment(deal.end_date) < moment()){
  			deal.walrandTG = true;
  		} else {
  			deal.walrandTG = false;
  		}
  	})
    $scope.deals = deals;
  });

  $scope.today = moment();

  function openHover(el){
  	console.log(el);
  	$(this).find(".deal-img").addClass('deal-img-open');
  }

  function closeHover(el){
  	console.log(el);
  	$(this).find(".deal-img").removeClass('deal-img-open');
  }
});
