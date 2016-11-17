angular.module('App').controller('AboutCtrl', function ($scope, APIService) {
	APIService.dealers.get().then(function(dealers){
		$scope.dealers = dealers;
	})
});