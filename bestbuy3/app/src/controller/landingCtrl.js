/**
 * Developer: Satish Sekar
 * Controller file for the landing page
 */
bbyc.common.controller('landingController', ['$scope', 'Config', 'DialogConfig', 'CommonUtils', function($scope, Config, DialogConfig, CommonUtils) {
    var categoryURL = Config.services.root + Config.services.endpoint.categories.path;
    var productURL = Config.services.root + Config.services.endpoint.products.filter.path;

    $scope.config = Config;
    $scope.dialogConfig = DialogConfig;
    $scope.categories = [];
    $scope.products = {};

    $scope.refreshCategories = function() {
        CommonUtils.getServiceResponse(categoryURL)
            .then(function (data) {
                $scope.categories = data.subCategories;
            })
    };

    $scope.refreshProducts = function(catId) {
            newProductURL = productURL + catId;

            CommonUtils.getServiceResponse(newProductURL)
                .then(function (data) {
                    $scope.products = data.products;
                })
    };

    $scope.getStarRatings = function(input, max, elem, sku) {
        var width = $(elem).width();
        var factor = (input/max)*width;
        $("ul.products li." + sku + " " + elem).css("width", factor + "px");
    };

    $scope.refreshCategories();
    $scope.refreshProducts($scope.categories[0]);

    $scope.addEllipsis = function(inputStr, length, word) {
        var newStr = CommonUtils.ellipsis(inputStr, length, word);
        return newStr;
    };

    $scope.openDialog = function(prod) {
        $scope.config.pages.DialogView.enable = true;
        $scope.dialogConfig.title = prod.name;
        $scope.dialogConfig.img = Config.root + prod.thumbnailImage;
        $scope.dialogConfig.description = prod.shortDescription;
        $scope.dialogConfig.regularPrice = prod.regularPrice;
        $scope.dialogConfig.salePrice = prod.salePrice;
        $scope.dialogConfig.customerRating = prod.customerRating;
    };
}]);