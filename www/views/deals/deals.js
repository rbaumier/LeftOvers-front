'use strict';

angular.module('App').controller('DealsCtrl', function($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup, APIService, store) {
  function getUser(f) {
    var user = store.get('user');
    if (user) {
      return f(user);
    }
    navigator.geolocation.getCurrentPosition(function onSuccess(position) {
      f({ geolocation: position.coords.longitude + ', ' + position.coords.latitude });
    }, function onError(error) {
      console.error('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      f({ geolocation: '-1.5535387999999999, 47.2173782' }); // default location
    });
  }

  getUser(function(user) {
    APIService.deals.get(user.geolocation, user.id).then(function(deals) {
      deals.map(function(deal) {
        if (moment(deal.end_date) < moment()) {
          deal.walrandTG = true;
        } else {
          deal.walrandTG = false;
        }
      })
      console.log(deals);
      $scope.deals = deals;
    });
  });

  $scope.today = moment();

  function openHover(el) {
    console.log(el);
    $(this).find(".deal-img").addClass('deal-img-open');
  }

  function closeHover(el) {
    console.log(el);
    $(this).find(".deal-img").removeClass('deal-img-open');
  }
});
