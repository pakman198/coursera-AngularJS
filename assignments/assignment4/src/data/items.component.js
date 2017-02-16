(function () {
	'use strict';

	angular.module('data')
	.component('categoryItems', {
	  templateUrl: 'src/data/templates/items.template.html',
	  bindings: {
	    items: '<'
	  }
	});

})();
