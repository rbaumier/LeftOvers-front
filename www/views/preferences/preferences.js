'use strict';

angular.module('App').controller('PreferencesCtrl', function ($scope, APIService) {
  APIService.preferences.get().then(function(dealers) {
    $scope.dealers = dealers;
  });
});
