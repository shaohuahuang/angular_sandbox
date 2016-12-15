(function(angular) {
  'use strict';
angular.module('myApp', [])
  .controller('MyCtrl', ['$scope', function($scope) {
    $scope.filter = { value: 'something' };
    $scope.clearFilter = function(){
      // $scope.filter.value = "";
      $scope.$broadcast('reset');
    }
}])
.directive('oneItem', function($compile) {
  return { 
    restrict: 'E',
    scope: {
      filter: "="
    },
    link: function(scope, elem, attr){
      scope.$on('reset', function(){
        scope.searchStr = "";
      })
    },
    template: '<input ng-model="searchStr"/> <br> \
              <input ng-model="filter.value" ng-change="reset()"/>'
  }
})
  
})(window.angular);