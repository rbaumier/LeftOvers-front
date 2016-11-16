angular.module('App', ['ionic', 'restangular'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/', '/deals');

  $stateProvider
    .state('deals', {
      url: '/deals',
      templateUrl: 'views/deals/deals.html',
      controller: 'DealsCtrl'
    })

    .state('newdeal', {
      url: '/deals/new',
      templateUrl: 'views/deals/newdeal.html',
      controller: 'NewDealCtrl'
    })

    .state('mydeals', {
      url: '/deals/me',
      templateUrl: 'views/deals/mydeals.html',
      controller: 'MyDealsCtrl'
    })


    .state('about', {
      url: '/about',
      templateUrl: 'views/about/about.html'
    });

  $urlRouterProvider.otherwise('/');
})

.run(function($ionicPlatform, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('NavbarCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:3005');
})

.factory('APIService', function(Restangular) {
  return {
    dealers: {
      get: function() {
        return Restangular.all('dealers').getList();
      }
    },
    deals: {
      get: function() {
        return Restangular.all('deals').getList();
      },
      getByDealerId: function(dealerId) {
        return Restangular.all('deals').customGET('', { dealer_id: dealerId });
      },
      create: function(deal) {
        return Restangular.all('deals').post(deal);
      },
      removeById: function(id) {
        return Restangular.one('deals', id).remove();
      }
    }
  };
})
