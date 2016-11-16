angular.module('App').controller('AboutCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicLoading, $ionicPopup) {


	$scope.friends = [

		{
		 name: 	"potata",
		 url:  	"http://66.media.tumblr.com/586b9bebe68367a7ae7d9a52b07449a4/tumblr_ogo8lohAhU1tki7xko1_400.jpg"
		},
		{
		 name: 	"pototo",
		 url: 	"http://67.media.tumblr.com/5c5ae72eecb9c47750de10f09131bebf/tumblr_o5a4cw4HYH1qgrbzdo1_400.jpg"
		},
		{
		 name: 	"potete",
		 url: 	"http://65.media.tumblr.com/c60727b107659bc54792cef4bc5d6da9/tumblr_ml1qlwUKod1qanqxuo1_400.jpg"
		},
		{
		 name: 	"testa",
		 url: 	"http://66.media.tumblr.com/b7009f619314ad5eafbc887af573ef37/tumblr_inline_ogon1cVeds1rfztmg_500.gif"
		}

	];

	$http.get('http://leftovers.jlitaize.fr/api/dealers').success(function (data) {
    	$scope.dealers = data;
  	});


});