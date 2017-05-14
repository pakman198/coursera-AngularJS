(function() {
	'use strict';

	angular.module('public')
	.controller('MyInfoController', MyInfoController);

	MyInfoController.$inject = ['MenuService', 'ApiPath'];
	function MyInfoController(MenuService, ApiPath){
		var $ctrl = this;
		var info = MenuService.getUserInfo();

		$ctrl.userInfo = info;
		$ctrl.basePath = ApiPath;
		
		if(info.is_stored && info.user.hasOwnProperty('menuItem')){
			var menuItem = info.user.menuItem.charAt(0).toUpperCase() + info.user.menuItem.slice(1);
			MenuService.getShortName(menuItem).then(function(response){

				console.log('item', response.data);
				$ctrl.userInfo.menuItem = response.data;
				
			});
		}
	}
})();