(function(){
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "//davids-restaurant.herokuapp.com")
	.directive('foundItems', FoundItemsDirective);

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var narrow = this;

		narrow.searchTerm = '';

		narrow.getItems = function(){
			if(narrow.searchTerm != ''){
				var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

				promise.then(function (response) {
				    narrow.found = response;
				});
			}else{
				narrow.found = 0;
			}
		}

		narrow.hideContent = function(){
			narrow.found = undefined;
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
					var description = items[i].description.toLowerCase();
					if( description.indexOf(searchTerm.toLowerCase()) != -1 ){
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