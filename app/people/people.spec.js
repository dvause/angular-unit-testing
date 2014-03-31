describe('Unit Test: people module', function() {
	var peopleCtrl;
	var $scope;

	beforeEach(module("people"));
	beforeEach(inject(function($controller, $rootScope) {
		$scope = $rootScope.$new();
		peopleCtrl = $controller("PeopleController", {$scope: $scope})
	}));

	describe("PeopleController", function() {
		it("should fetch a list of people from a backend service", function() {

		})
	})
});