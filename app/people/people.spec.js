var peopleData = [
	{firstName: 'Annie', lastName: 'Kim', email: 'anniekim@maroptic.com' },
	{firstName: 'Jane', lastName: 'Doe', email: 'jdoe@maroptic.com' },
];
var personData = {firstName: 'Annie', lastName: 'Kim', email: 'anniekim@maroptic.com' };

describe('Unit Test: people module', function() {
	var peopleCtrl;
	var $scope;
	var peopleService;

	beforeEach(module("people"));

	beforeEach(inject(function($controller, $rootScope, $q, _PeopleService_) {
		$scope = $rootScope.$new();
		peopleService = _PeopleService_;
		peopleCtrl = $controller('PeopleController', {$scope: $scope});

		spyOn(peopleService, 'getPeople').andCallFake(function() {
			return $q.when(peopleData);
		});

		spyOn(peopleService, 'getPerson').andCallFake(function() {
			return $q.when(personData);
		});
	}));


	describe("PeopleController" ,function() {
		it("should fetch a list of people from a backend service and populate the peopleCtrl.people property", function() {
			peopleCtrl.init(); //get the list of people by calling the peopleService
			$scope.$digest(); //run the digest cycle
			expect(peopleService.getPeople).toHaveBeenCalled();
			expect(peopleCtrl.people.length).not.toBe(0);
		});

		it("should populate the selectedPerson when selectPerson() is called", function() {
			peopleCtrl.selectPerson(personData);
			$scope.$digest();
			expect(peopleCtrl.selectedPerson).not.toBe(null);
		})
	})
});