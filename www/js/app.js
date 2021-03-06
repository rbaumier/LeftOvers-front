angular.module('App', ['ionic', 'restangular', 'angular-storage'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/', '/deals');

  $stateProvider
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

.controller('NavCtrl', function($scope, store) {
  var user = store.get('user');
  if (!user) {
    return;
  }

  $scope.isLogged = !!user;
  $scope.isDealer = user.type === 'dealers';
  $scope.isUser = user.type === 'users'
})

.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://leftovers.jlitaize.fr/api');
  // RestangularProvider.setBaseUrl('http://l:3005/api');
  RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig, store) {
    var JSONUser = window.localStorage.getItem('user');
    if (JSONUser) {
      headers.Authorization = 'Bearer ' + JSON.parse(JSONUser).token;
    } else {
      delete headers.Authorization;
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
    auth: {
      login: function(credentials) {
        return Restangular.all('login').post(credentials);
      },
      logout: function() {
        return Restangular.all('logout').post({});
      }
    },
    dealers: {
      create: function(dealer) {
        return Restangular.all('dealers').post(dealer);
      },
      get: function() {
        return Restangular.all('dealers').getList();
      },
      getById: function(id) {
        return Restangular.one('dealers', id).get();
      },
      getRatingById: function(id) {
        return Restangular.one('dealers', id).all('ratings').getList();
      },
      update: function(id, dealer) {
        return Restangular.one('dealers', id).customPUT(dealer, '', {});
      }
    },
    deals: {
      get: function(geolocation, user_id) {
        return Restangular.all('deals').getList({ geolocation: geolocation, user_id: user_id }); // à regarder dans les user preferences de la bdd
      },
      getByDealerId: function(dealerId) {
        return Restangular.all('deals').customGET('search', { dealer_id: dealerId });
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
        return Restangular.one('users', userId).customGET('preferences', { user_id: userId });
      },
      update: function(id, preferences) {
        return Restangular.one('users', id).all('preferences').customPUT(preferences, '', {});
      }
    },
    users: {
      create: function(user) {
        return Restangular.all('users').post(user);
      },
      getById: function(id) {
        return Restangular.one('users', id).get();
      },
      update: function(id, user) {
        return Restangular.one('users', id).customPUT(user, '', {});
      }
    }
  };
})

.factory('AuthService', function(Restangular, APIService, store, $q) {
  function login(credentials, shouldRedirect) {
    if (_.isUndefined(shouldRedirect)) {
      shouldRedirect = true; // redirect by default
    }
    return APIService.auth.login(credentials).then(function(user) {
      if (user.success === false) {
        return $q.reject(user.message);
      }
      store.set('user', user);
      return shouldRedirect ? location.reload() : true;
    });
  }

  function logout() {
    return APIService.auth.logout().then(function() {
      store.remove('user');
      location.reload();
    });
  }

  return {
    login: login,
    logout: logout
  };
})
