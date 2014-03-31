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

	.directive('person', function () {
		return {
			restrict: "E",
			scope: {
				firstName: "@",
				lastName: "@",
				email: "@"
			},
			template: '<table class="table">\n  <tr>\n    <td>First Name:</td>\n    <td>{{firstName}}</td>\n  </tr>\n  <tr>\n    <td>Last Name:</td>\n    <td>{{lastName}}</td>\n  </tr>\n  <tr>\n    <td>Email:</td>\n    <td>{{email}}</td>\n  </tr>\n</table>'
		}
	})
;