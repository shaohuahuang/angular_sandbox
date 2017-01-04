angular.module('routerApp',['ui.router', 'contacts']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('contacts', {
    //url: "/nice",
    //templateUrl: 'contacts.html',
    //controller: 'ContactsController',
    //resolve: {
    //  simpleObj: function () {
    //    return {value: 'simple'}
    //  }
    //},
    //data: {
    //  contacts: '98765674'
    //},
    //onEnter: function (simpleObj) {
    //  console.log(simpleObj.value, "enter");
    //},
    //onExit: function(simpleObj){
    //  console.log(simpleObj.value);
    //}
  })
    .state('contacts.list', {
      url: '/contacts/list',
      templateUrl: 'contacts.list.html',
      //onEnter: function (simpleObj) {
      //  console.log(simpleObj.value, "list enter");
      //}
    });
  //$urlRouterProvider.otherwise('/');
}).controller('MainCtrl', function($scope, $state){
  $scope.main = "Main Ctrl Value";
  //$state.transitionTo('contacts.list');
});

angular.module('contacts', []).controller('ContactsController', function($scope,$state){
  //$scope.title = simpleObj.value;
  $scope.contacts = [{ name: 'Alice' }, { name: 'Bob' }];
});