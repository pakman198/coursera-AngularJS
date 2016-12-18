(function(){
	'use stric';
	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var buy = this;

		buy.items = ShoppingListCheckOffService.getItems();

		buy.removeItem = function(itemIndex){
			ShoppingListCheckOffService.buyItem(itemIndex);	
		}
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var bought = this;

		bought.items = ShoppingListCheckOffService.getBoughtItems();
		bought.listSize = bought.items.length;
	}

	function ShoppingListCheckOffService(){
		var service = this;

		// List of shopping items
		var toBuyItems = [
			{
				name : 'Cookies',
				quantity : 10
			},
			{
				name : 'Beers',
				quantity : 24
			},
			{
				name : 'Chips',
				quantity : 3
			},
			{
				name : 'Pizzas',
				quantity : 4
			},
			{
				name : 'Brownies',
				quantity : 5
			}
		];

		var boughtItems = [];


		service.buyItem = function (itemIndex) {
		  boughtItems.push( toBuyItems[itemIndex] );
		  toBuyItems.splice(itemIndex, 1);
		};

		service.getItems = function () {
		  return toBuyItems;
		};

		service.getBoughtItems = function(){
			return boughtItems;
		}
	}

})();