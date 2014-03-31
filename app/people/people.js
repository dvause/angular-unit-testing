angular.module('myapp.people', [
	'ui.router'
])

	.config(function ($stateProvider) {
		$stateProvider
			.state('people', {
				url: '/people',
				templateUrl: 'app/people/people.tpl.html',
				controller: 'PeopleController as peopleCtrl'
			})
			.state('person', {
				url: '/person/:id',
				templateUrl: 'app/people/person.tpl.html',
				controller: 'PersonController as personCtrl'
			})
	})


	.controller('PeopleController', function peopleCtrl($http, PeopleService) {
		var peopleCtrl = this;
		peopleCtrl.message = null;
		peopleCtrl.selectedPerson = null;

		PeopleService.getPeople().then(function (data) {
			peopleCtrl.people = data;
		});


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

	.service('PeopleService', function PeopleService($q, $http) {
		var peopleService = this;

		peopleService.getPeople = function () {
			var d = $q.defer();
			$http.get('http://localhost:3500/api/people')
				.success(function (data) {
					d.resolve(data);
				})
				.error(function (data) {
					d.reject(data);
				});
			return d.promise;
		};

		peopleService.getPerson = function(person_id) {
			var d = $q.defer();
			$http.get('http://localhost:3500/api/people/' + person_id)
				.success(function (data) {
					d.resolve(data);
				})
				.error(function (data) {
					d.reject(data);
				});
			return d.promise;
		};

		peopleService.savePerson = function (person) {
			var d = $q.defer();
			$http.post('http://localhost:3500/api/people', person)
				.success(function (data) {
					d.resolve(data);
				})
				.error(function (data) {
					d.reject(data);
				});
			return d.promise;
		};

		peopleService.updatePerson = function (person) {
			var d = $q.defer();
			$http.put('http://localhost:3500/api/people/' + person._id, person)
				.success(function (data) {
					d.resolve(data);
				})
				.error(function (data) {
					d.reject(data);
				});
			return d.promise;
		};

		peopleService.deletePerson = function (id) {
			var d = $q.defer();
			$http.delete('http://localhost:3500/api/people/' + id)
				.success(function (data) {
					d.resolve(data);
				})
				.error(function (data) {
					d.reject(data);
				});
			return d.promise;
		}
	})

;
