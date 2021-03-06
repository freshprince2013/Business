/**
 * Developer: Satish Sekar
 * Controller file for the index page
 */
bbyc.common.controller('indexController', ['$scope', 'Config', function($scope, Config) {
    $scope.config = Config;
    $scope.commonTpl = "./src/view/" + Config.pages.CommonView.pageName;
	$scope.categoryTpl = "./src/view/" + Config.pages.CategoryView.pageName;
	$scope.productTpl = "./src/view/" + Config.pages.ProductView.pageName;
    $scope.dialogTpl = "./src/view/" + Config.pages.DialogView.pageName;
}]);