describe('Unit Test: myapp module', function() {
	var appCtrl;
	var $scope;
	var $location;

	beforeEach(module("myapp"));
	beforeEach(inject(function($rootScope, $controller, _$location_) {
		$location = _$location_;
		$scope = $rootScope.$new();
		appCtrl = $controller('AppController', {$scope: $scope});
	}));

	describe("Controller: App Controller", function() {
		it("should have a method to check if the path is active", function() {
			$location.path('/');
			expect($location.path()).toBe("/");
			expect($scope.isActive('/')).toBe(true);
			expect($scope.isActive('/people')).toBe(false);
		})
	});


});