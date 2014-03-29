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
  })


  .controller('PeopleController', function peopleCtrl($http) {
    var peopleCtrl = this;
    $http.get('http://localhost:3500/api/people').success(
      function(result) {
        peopleCtrl.people = result;
      }
    )

  })
;
