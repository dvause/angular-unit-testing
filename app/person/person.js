angular.module('person', [
	'ui.router',
	'people-service'
])
	.config(function ($stateProvider) {
		$stateProvider
			.state('person', {
				url: '/person/:id',
				templateUrl: 'app/person/person.tpl.html',
				controller: 'PersonController as personCtrl'
			})
	})

	.controller('PersonController', function personCtrl($stateParams, $http, PeopleService) {
		var personCtrl = this;
		personCtrl.message = null;

		if ($stateParams.id) {
			PeopleService.getPerson($stateParams.id).then(function (data) {
				personCtrl.person = data;
			});
		}

		personCtrl.savePerson = function (person) {
			if (person._id) {
				PeopleService.updatePerson(person).then(function (data) {
					personCtrl.person = data;
					personCtrl.message = "Updated person";
				});
			} else {
				PeopleService.savePerson(person).then(function (data) {
					personCtrl.person = data;
					personCtrl.message = "Saved new person";
				});
			}
		}
	})

;