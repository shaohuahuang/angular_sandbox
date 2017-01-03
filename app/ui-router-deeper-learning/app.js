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
	});