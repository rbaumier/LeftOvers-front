'use strict';

angular.module('App').controller('DealsCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, APIService) {
  APIService.deals.get().then(function(deals) {
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
