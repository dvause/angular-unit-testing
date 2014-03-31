angular.module('people-service', [
	'myconfig'
])

	.service('PeopleService', function PeopleService($q, $http, apiUrl) {
		var peopleService = this;

		peopleService.getPeople = function () {
			var d = $q.defer();
			$http.get(apiUrl + '/people')
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
			$http.get(apiUrl + '/people/' + person_id)
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
			$http.post(apiUrl + '/people', person)
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
			$http.put(apiUrl + '/people/' + person._id, person)
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
			$http.delete(apiUrl + '/people/' + id)
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
