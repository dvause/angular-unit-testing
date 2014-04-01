angular.module('people', [
	'ui.router',
	'people-service',
	'myconfig'
])

	.config(function ($stateProvider) {
		$stateProvider
			.state('people', {
				url: '/people',
				templateUrl: 'app/people/people.tpl.html',
				controller: 'PeopleController as peopleCtrl'
			})
	})

	.controller('PeopleController', ['$http', 'PeopleService', function peopleCtrl($http, PeopleService) {
		var peopleCtrl = this;
		peopleCtrl.message = null;
		peopleCtrl.selectedPerson = null;
		peopleCtrl.people = [];

		peopleCtrl.init = function() {
			PeopleService.getPeople().then(function (data) {
				peopleCtrl.people = data;
			});
		};

		peopleCtrl.selectPerson = function (person) {
			PeopleService.getPerson(person._id).then(function (data) {
				peopleCtrl.selectedPerson = data;
			})
		};

		peopleCtrl.deletePerson = function (person) {
			PeopleService.deletePerson(person._id).then(function (data) {
				peopleCtrl.message = {
					class: 'alert-danger',
					message: 'Deleted person: ' + data._id,
					display: true
				};
				peopleCtrl.selectedPerson = null;
				PeopleService.getPeople().then(function (data) {
					peopleCtrl.people = data;
				})
			});
		};
	}])

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
