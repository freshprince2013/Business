/**
 * Developer: Satish Sekar
 * Controller file for the modal dialog
 */
bbyc.common.controller('dialogController', ['$scope', 'Config', 'DialogConfig', 'CommonUtils', function($scope, Config, DialogConfig, CommonUtils) {
    $scope.config = Config;
    $scope.dialogConfig = DialogConfig;
	
	$scope.getRegularClass = function(prod) { 
		return (prod.regularPrice !== prod.salePrice) ? "yesStrike" : "noStrike";
	};
	
    $scope.closeDialog = function() {
        $scope.config.pages.DialogView.enable = false;
    };
}]);