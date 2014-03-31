function PeoplePage() {
	this.peopleList = element(by.repeater('person in peopleCtrl.people'));
	this.selectedPerson = element(by.binding(''));

	this.get = function() {
		browser.get('/#/people');
	}
}
describe("E2E Test: People", function() {

	var peoplePage = new PeoplePage();

	beforeEach(function() {
		peoplePage.get();
	});

	describe("people", function() {
		it("should display a list of people", function() {

			var people = peoplePage.peopleList;
			var person = peoplePage.peopleList.row(2).column('firstName');
			console.log(person)
		})
	})

});