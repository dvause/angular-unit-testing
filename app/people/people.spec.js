var peopleData = [
	{firstName: 'Annie', lastName: 'Kim', email: 'anniekim@maroptic.com' },
	{firstName: 'Jane', lastName: 'Doe', email: 'jdoe@maroptic.com' },
];
var personData = {firstName: 'Annie', lastName: 'Kim', email: 'anniekim@maroptic.com' };

describe('Unit Test: people module', function() {
	var $controller;
	var peopleCtrl;
	var $scope;
	var peopleService;

	beforeEach(module("people"));

	beforeEach(inject(function(_$controller_, $rootScope, $q, _PeopleService_) {
		$controller = _$controller_;
		$scope = $rootScope.$new();
		peopleService = _PeopleService_;

		spyOn(peopleService, 'getPeople').andCallFake(function() {
			return $q.when(peopleData);
		});

		spyOn(peopleService, 'getPerson').andCallFake(function() {
			return $q.when(personData);
		});

	}));

	function createController() {
		peopleCtrl = $controller('PeopleController', {$scope: $scope});
	}

	describe("PeopleController" ,function() {
		it("should fetch a list of people from a backend service and populate the peopleCtrl.people property", function() {
			createController();
			peopleCtrl.init(); //get the list of people by calling the peopleService
			$scope.$digest(); //run the digest cycle
			expect(peopleService.getPeople).toHaveBeenCalled();
			expect(peopleCtrl.people.length).not.toBe(0);
		});

		it("should populate the selectedPerson when selectPerson() is called", function() {
			createController();
			peopleCtrl.selectPerson(personData);
			$scope.$digest();
			expect(peopleCtrl.selectedPerson).not.toBe(undefined);
		})
	})
});