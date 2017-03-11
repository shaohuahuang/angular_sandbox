angular.module('example',[]).config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
})
.factory('loggingService', function(){
  return {start: function(){

  }};
})
.run(function (loggingService) {
  loggingService.start();
});