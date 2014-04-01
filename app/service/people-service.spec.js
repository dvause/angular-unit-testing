describe("Unit Test: people-service", function() {
	var $httpBackend;
	var PeopleService;
	var apiUrl;

	beforeEach(module('people-service'));

	beforeEach(inject(function(_$httpBackend_, _PeopleService_, _apiUrl_) {
		$httpBackend = _$httpBackend_;
		PeopleService = _PeopleService_;
		apiUrl = _apiUrl_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe("getPeople()" , function() {
		it("should get a list of people from the server", function() {
			var returnData = [];
			$httpBackend.expectGET(apiUrl + '/people').respond(200, returnData);
			var promise = PeopleService.getPeople();
			var result;
			promise.then(function(data) {
				result = data;
			});
			$httpBackend.flush();
			expect(result).toEqual(returnData)
		})
	});

	describe("getPerson()", function() {
		it("should get a single person from the server", function() {
			var returnData = {};
			var personId = '53273832acc5f019633a5d25';
			$httpBackend.expectGET(apiUrl + '/people/' + personId).respond(200, returnData);
			//$httpBackend.expectGET(apiUrl + '/person/' + personId).respond(200, returnData);
			var promise = PeopleService.getPerson(personId);
			var result;
			promise.then(function(data) {
				result = data;
			});
			$httpBackend.flush();
			//console.log(result); //just to show that no call is actually made to the service
			expect(result).toEqual(returnData);
		})
	})

	describe("savePerson()", function() {
		it("should post a new person record to the server", function() {
			var person = {firstName: 'Bob', lastName: 'Smith', email: 'bsmith@example.com'};
			var returnData = person;
			$httpBackend.expectPOST(apiUrl + '/people', person).respond(200, returnData);
			var promise = PeopleService.savePerson(person);
			var result;
			promise.then(function(data) {
				result = data;
			});
			$httpBackend.flush();
			expect(result).toEqual(returnData);
		})
	})



});