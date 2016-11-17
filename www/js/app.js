angular.module('App', ['ionic', 'restangular', 'angular-storage'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/', '/deals');

  $stateProvider
    .state('dealers', {
      url: '/dealers',
      templateUrl: 'views/dealers/dealers.html',
      controller: 'DealersCtrl'
    })

    .state('preferences', {
      url: '/preferences',
      templateUrl: 'views/preferences/preferences.html',
      controller: 'PreferencesCtrl'
    })

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

    .state('dealer', {
      url: '/dealers/:id',
      templateUrl: 'views/dealer/dealer.html',
      controller: 'DealerCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'views/auth/login.html',
      controller: 'LoginCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'views/auth/signup.html',
      controller: 'SignupCtrl'
    })

    .state('about', {
      url: '/about',
      templateUrl: 'views/about/about.html',
      controller: 'AboutCtrl'
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
  RestangularProvider.setBaseUrl('http://leftovers.jlitaize.fr/api');
  RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
    var jwt = window.localStorage.getItem('jwt');
    if(jwt && !angular.isString(headers.Authorization)) {
      headers.Authorization = 'Bearer ' + jwt;
    }
    return {
      element: element,
      params: params,
      headers: headers,
      httpConfig: httpConfig
    };
  });
})

.factory('APIService', function(Restangular) {
  return {
    dealers: {
      get: function() {
        return Restangular.all('dealers').getList();
      },
      getById: function(id) {
        return Restangular.one('dealers', id).get();
      }
    },
    deals: {
      get: function() {
        return Restangular.all('deals').getList({geolocation: '-1.5535387999999999, 47.2173782', radius: 4000});
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
    },
    preferences: {
      get: function(userId) {
        return Restangular.all('preferences').customGET('', { user_id: userId });
      }
    }
  };
})
