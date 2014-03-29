angular.module('myapp.people', [
  'ui.router'
])

  .config(function($stateProvider) {
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


  .controller('PeopleController', function peopleCtrl($http, $log) {
    var peopleCtrl = this;
    peopleCtrl.message = null;
    peopleCtrl.selectedPerson = null;


    $http.get('http://localhost:3500/api/people').success(function(result) {
      peopleCtrl.people = result;
    });

    peopleCtrl.selectPerson = function(person) {
      $http.get('http://localhost:3500/api/people/' + person._id).success(function(data) {
        $log.debug('selected:' + data);
        peopleCtrl.selectedPerson = data;
      });
    };

    peopleCtrl.deletePerson = function(person) {
      $log.debug(person)
      $http.delete('http://localhost:3500/api/people/' + person._id).success(function(data) {
        $log.debug('deleted' + person);
        peopleCtrl.message = {
          class: 'alert-danger',
          message: 'Deleted person: ' + person._id,
          display:true
        };
        $http.get('http://localhost:3500/api/people').success(function(result) {
          peopleCtrl.people = result;
        });
      })
    };

  })

  .controller('PersonController', function personCtrl($stateParams, $http, $log) {
    var personCtrl = this;
    personCtrl.message = null;

    if ($stateParams.id) {
      $http.get('http://localhost:3500/api/people/' + $stateParams.id).success(function(data) {
        personCtrl.person = data;
        $log.debug(data);
      });
    }

    personCtrl.savePerson = function(person) {
      if (person._id) {
        $http.put('http://localhost:3500/api/people/' + person._id, person).success(function(data) {
          personCtrl.person = data;
          personCtrl.message = "Updated person";
          $log.debug(data);
        });
      } else {
        $http.post('http://localhost:3500/api/people', person).success(function(data) {
          personCtrl.person = data;
          personCtrl.message = "Saved new person";
          $log.debug(data);
        });
      }
    }
  })
;
