angular.module('myapp', [
  'ui.router'
])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('home', {
        url: '/'
      });
    $urlRouterProvider.otherwise('/');
  })

  .controller('AppController', function($scope, $state) {
    $scope.setPage = function(page) {
      $state.transitionTo(page);
    }
  })
;
