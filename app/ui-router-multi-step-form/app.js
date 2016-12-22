angular.module('formApp', ['ngAnimate', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('form', {
    url: '/form',
    templateUrl: 'form.html',
    controller: 'formController'
  }).state('form.profile', {
    url: '/profile',
    templateUrl: 'form-profile.html'
  }).state('form.interests', {
    url: '/interests',
    templateUrl: 'form-interests.html'
  }).state('form.payment',{
    url: '/payment',
    templateUrl: 'form-payment.html'
  });

  $urlRouterProvider.otherwise('/form/profile');
})
  .controller('formController', function($scope) {

  // we will store all of our form data in this object
  $scope.formData = {};

  // function to process the form
  $scope.processForm = function() {
    alert('awesome!');
  };

});