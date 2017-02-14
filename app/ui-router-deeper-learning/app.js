angular.module('routerApp', ['ui.router'])
	.config(['$stateProvider','$urlRouterProvider',
		function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home',{
			url:'/',
			templateUrl: 'contacts.tpl.html',
			controller: 'homeCtrl',
			resolve: {
				simpleObj:  function(){
					return {value: 'simple!'};
				},
			}
		})
		.state('home.contact',{
			url:'contact/',
			templateUrl: 'contact.tpl.html',
			controller: 'contactCtrl',
			resolve: {
				childSimpleObj: function(simpleObj){
					return {value: simpleObj.value + ' child' }
				}
			}
		}).state('home.contact.phone',{
				url:'phone',
				templateUrl: 'phone.tpl.html',
				controller: 'phoneCtrl',
				resolve: {
					grandchildSimpleObj: function(simpleObj){
						return {value: simpleObj.value + ' grandchild' }
					}
				}
			})
	}]).controller('homeCtrl', function($scope, simpleObj){
		$scope.title = "My Contacts 1";
		$scope.simpleObj = simpleObj;
	}).controller('contactCtrl', function($scope,simpleObj,childSimpleObj){
		$scope.simpleObj = simpleObj;
		$scope.childSimpleObj = childSimpleObj;
	}).controller('phoneCtrl', function($scope,simpleObj,grandchildSimpleObj){
		$scope.simpleObj = simpleObj;
		$scope.grandchildSimpleObj = grandchildSimpleObj;
	})
  .filter('moreThan10', function(){
    return function(input){
      console.log("=================filter triggered============")
      return input.filter(function(item){
        return item > 10;
      })
    }
  })
  .controller("mainController", function($scope){
    $scope.arr1 = [10,11,12,1,2,3,4];
    $scope.arr2 = [1,2,11,4,5,34];

    $scope.updateArr1 = function(){
      $scope.arr1.push(20);
      $scope.arr1 = ($scope.arr1).filter(function(item){
        return item > 10;
      })
    }

    $scope.updateArr2 = function(){
      $scope.arr2.push(21)
    }

    $scope.updateArr3 = function(){
      $scope.arr3 = [11];
    }
  });