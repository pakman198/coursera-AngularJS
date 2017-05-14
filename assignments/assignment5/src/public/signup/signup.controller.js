(function(){
	'use strict';

	angular.module('public')
	.controller('SignUpController', SignUpController);

	SignUpController.$inject = ['MenuService'];
	function SignUpController (MenuService) {
		var $ctrl = this;

		$ctrl.valid_item = true;
		$ctrl.storedData = {};

		$ctrl.submit = function (user) {
			$ctrl.completed = true;
			$ctrl.disabled = true;
			$ctrl.successMsg = "Your information has been saved";
			MenuService.setUserInfo(user);
		}

		$ctrl.checkItem = function(item){
			if(item){
				var short_name = item.charAt(0).toUpperCase() + item.slice(1)
				MenuService.getShortName(short_name).then(function(response){
					$ctrl.valid_item = true

				}, function(e){
					$ctrl.valid_item = false

				});
			}
		}
	}
})();