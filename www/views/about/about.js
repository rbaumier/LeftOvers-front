angular.module('App').controller('AboutCtrl', function ($scope, APIService) {
	APIService.dealers.get().then(function(dealers){
		console.log("dealers",dealers);
		$scope.dealers = dealers;
	})
});