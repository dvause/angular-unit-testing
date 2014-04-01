describe('Unit Test: people module', function() {
	var controller;
	var scope;
	var peopleService;
	var q;
	var deferred;

	beforeEach(module("people"));

	beforeEach(inject(function($controller, $rootScope, $q) {
		peopleService = {
			getPeople: function() {
				deferred = q.defer();
				return deferred.promise;
			}
		};
		scope = $rootScope.$new();
		q = $q;
		controller = $controller("PeopleController", {$scope: scope, PeopleService: peopleService})
		spyOn(peopleService, 'getPeople').andCallThrough();
	}));

	describe("PeopleController" ,function() {
		it("should fetch a list of people from a backend service", function() {
			controller.init();
			deferred.resolve();
			scope.$digest();
			expect(peopleService.getPeople).toHaveBeenCalled();
		})
	})



});