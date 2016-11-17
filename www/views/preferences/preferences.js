'use strict';

angular.module('App').controller('PreferencesCtrl', function ($scope, $state, store, APIService, AuthService) {
  $scope.user = {};
  $scope.dealer = {};

  var user = store.get('user');
  if(!user) return $state.go('deals');

  if(user.type === 'dealers'){
    $scope.isDealer = true;
    APIService.dealers.getById(user.id).then(function(dealer) {
      $scope.dealer = dealer;
    }).catch(function(err) {
      $scope.errors = err;
    });
  };

  if(user.type === 'users'){
    $scope.isUser = true;
    APIService.preferences.get(user.id).then(function(preferences) {
      $scope.preferences = preferences;
    });

    APIService.users.getById(user.id).then(function(user) {
      $scope.user = user;
    });
  };

  $scope.logout = function() {
    AuthService.logout(user).then(function() {
      $state.go('deals');
    }).catch(function(err) {
      $scope.errors = err;
    })
  }

  $scope.updateUser = function(user, preferences) {
    APIService.users.update(user).then(function() {
      return APIService.preferences.update(user.id, preferences);
    })
    .then(function() {
      $state.go('deals');
    })
    .catch(function(err) {
      $scope.errors = err;
    });
  }

  $scope.updateDealer = function(dealer) {
    const payload = _.omit(dealer, 'geolocation', 'password', 'id', 'token', 'created_at', 'updated_at', 'deleted_at');
    APIService.dealers.update(dealer.id, payload).then(function() {
      $state.go('deals');
    }).catch(function(err) {
      $scope.errors = err;
    })
  }
});
