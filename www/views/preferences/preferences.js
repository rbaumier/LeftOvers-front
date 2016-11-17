'use strict';

angular.module('App').controller('PreferencesCtrl', function ($scope, $state, store, APIService, AuthService) {
  $scope.user = {};
  $scope.dealer = {};
  $scope.preferences = {};

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
      if(!_.isEmpty(preferences)) {
        $scope.preferences = preferences;
      }
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
    const userPayload = _.omit(user, 'id', 'created_at', 'geolocation', 'password', 'updated_at', 'deleted_at', 'token');
    APIService.users.update(user.id, userPayload).then(function() {
      const preferencesPayload = _.omit(preferences, 'id', 'created_at', 'updated_at', 'deleted_at', 'user_id');
      return APIService.preferences.update(user.id, preferencesPayload);
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
