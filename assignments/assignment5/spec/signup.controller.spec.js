describe('getMenuItem', function () {

  var menuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    /*module(function ($provide) {
      $provide.factory('loadingHttpInterceptor', function () {
        return {request: null, response: null, responseError: null};
      });
    });*/

    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return a valid menu item', function() {
    var itemCode = 'A2';
    $httpBackend.whenGET(ApiPath + '/menu_items/' + itemCode + '.json').respond({
		id: 2, 
		short_name: 'A2', 
		name: 'Egg Drop Soup', 
		description: 'chicken broth with egg drop'
	});
    menuService.getShortName(itemCode).then(function(response) {
    	expect(response.data).toEqual({
    		id: 2, 
    		short_name: 'A2', 
    		name: 'Egg Drop Soup', 
    		description: 'chicken broth with egg drop'
    	});
    });
    $httpBackend.flush();
  });

});