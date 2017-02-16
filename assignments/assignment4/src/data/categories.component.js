(function () {
	'use strict';

	angular.module('data')
	.component('categoriesComponent', {
	  templateUrl: 'src/data/templates/categories.template.html',
	  bindings: {
	    items: '<'
	  }
	});

})();
