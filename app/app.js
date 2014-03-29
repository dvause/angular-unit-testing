angular.module('myapp', [
  'ui.router',
  'myapp.people'
])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home.tpl.html'
      });
    $urlRouterProvider.otherwise('/');
  })

  .controller('AppController', function($scope, $state, $location) {
    $scope.setPage = function(page) {
      $state.transitionTo(page);
    }
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  })
;
