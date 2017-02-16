(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/home.template.html'
  })

  //show catgories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/data/templates/categories.component.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService){
        var promise = MenuDataService.getAllCategories();

        return promise.then(function (response){
          //console.log('promise data', response.data);
          return response.data;
        });
      }]
    }
  })

  .state('categoryItems',{
    url: '/categories/{shortName}',
    templateUrl: 'src/data/templates/items.component.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      catItems: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService){
        var promise = MenuDataService.getItemsForCategory($stateParams.shortName);

        return promise.then(function (response){
          return response.data;
        });
      }]
    }
  });

}

})();
