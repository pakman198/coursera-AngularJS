(function(){
	'use stric';
	angular.module('FirstAssignment', [])
	.controller('FirstAssignmentCtrl', myController);

	myController.$inject = ['$scope'];

	function myController($scope){
		$scope.userInput = "";

		$scope.message = "";

		$scope.checkInput = function checkInput(input){
			if(input == ''){
				$scope.message = 'Please enter data first';
			}else{
				var items = input.split(',');
				if(items.length <= 3){
					$scope.message = 'Enjoy!';
				}else{
					$scope.message = 'Too much!';
				}
			}
			//$scope.message= input;
		}
	}

})();