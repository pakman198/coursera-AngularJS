(function () {
	'use strict';

	angular.module('data')
	.controller('ItemsController', ItemsController);


	ItemsController.$inject = ['catItems'];
	function ItemsController(catItems) {
		var itemsCtrl = this;
		itemsCtrl.category = catItems.category;
		itemsCtrl.items = catItems.menu_items;
	}

})();
