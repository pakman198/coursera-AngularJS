(function(){
	'use strict';

	angular.module('MenuApp', ['ui.router', 'data', 'Spinner']);

	angular.module('MenuApp')
		.controller('MenuAppController', MenuAppController);

	MenuAppController.$inject = ['$rootScope'];
	function MenuAppController ($rootScope) {
		var menuCtrl = this;

		menuCtrl.$onInit = function () {
			$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams, options){
				menuCtrl.inTransition = true;
			});

			$rootScope.$on('$stateChangeSuccess',
			function(event, toState, toParams, fromState, fromParams){
				menuCtrl.inTransition = false;
			});

			$rootScope.$on('$stateChangeError',
			function(event, toState, toParams, fromState, fromParams, error){
				menuCtrl.inTransition = true;
			});
		}
	}

})();