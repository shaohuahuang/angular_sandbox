angular.module('app',['ui.bootstrap']).controller('mainCtrl',function($scope,$http,$uibModal,$q){
	$http.get('/keys').then(function(keys){
		console.log(keys.data);
		$scope.keys = keys.data;
	})

	$scope.onDeleteKey = function(keyIndex){
		var dialog = $uibModal.open({
			controller: 'deleteKeyModal',
			templateUrl: 'modal.tpl.html',
			resolve: {
				removeKey: function(){
					var deferred = $q.defer();
					$http.delete('/keys/' + keyIndex).then(function(response){
						deferred.resolve('success')
					}).catch(function(err){
						console.log(err);
						deferred.reject('error');
					});
					return deferred.promise;
				}
			}
		});
		dialog.result.then(function(s){
			if(s=='OK'){
				$scope.keys.splice(keyIndex,1);
			}
		})
	}
}).controller('deleteKeyModal', function($scope, $uibModalInstance, removeKey){
	$scope.deleteKey = function(){
		console.log(removeKey);
		//removeKey.then(function(status){
		//	if(status == 'success'){
		//		$uibModalInstance.close('OK');
		//	}
		//}).catch(function(err){
		//	console.log(err);
		//})
	}
});