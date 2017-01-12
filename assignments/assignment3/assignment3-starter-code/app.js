(function(){
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
	.directive('foundItems', FoundItemsDirective);

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var narrow = this;

		narrow.searchTerm = '';

		narrow.getItems = function(){
			var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

			promise.then(function (response) {
			    narrow.found = response;
			})
		}

		narrow.removeItem = function(index){
			narrow.found.splice(index, 1)
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){
		var service = this;

		service.getMatchedMenuItems = function(searchTerm){
			var response = $http({
			  method: "GET",
			  url: (ApiBasePath + "/menu_items.json")

			}).then(function(response){

				var items = response.data.menu_items;
				var matchedItems = []
				
				for(var i = 0; i < items.length; ++i){
					//console.log(items[i]);
					var description = items[i].description;
					if( description.indexOf(searchTerm) != -1 ){
						matchedItems.push(items[i]);
					}
				}

				return matchedItems;

			}).catch(function (error) {
				console.log(error);
			});

			return response;
		}
	}

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'foundItems',
			bindToController: true
		};

		return ddo;
	}

	function FoundItemsDirectiveController(){
		var list = this;
	}

})();