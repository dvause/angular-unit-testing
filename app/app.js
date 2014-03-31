angular.module('myapp', [
	'ui.router',
	'myconfig',
	'people',
	'person',
	'people-service'
])
	.config(function ($urlRouterProvider, $stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/home.tpl.html'
			});
		$urlRouterProvider.otherwise('/');
	})

	.controller('AppController', function ($scope, $state, $location) {
		$scope.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};
	})
;
