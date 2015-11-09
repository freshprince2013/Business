/**
 * Developer: Satish Sekar
 * Controller file for the modal dialog
 */

(function() { 
	var dialogConfig = {};
	
	bbyc.dialog = $.extend(true, bbyc, { 
		openDialog: function(prod) { 
			bbyc.config.pages.DialogView.enable = true;
			dialogConfig.enable = true;
			dialogConfig.title = prod.name;
			dialogConfig.thumbImg = bbyc.config.root + prod.thumbnailImage;
			dialogConfig.img = bbyc.config.root + prod.thumbnailImage;
			dialogConfig.description = prod.shortDescription;
			dialogConfig.regularPrice = prod.regularPrice;
			dialogConfig.regularClass = bbyc.dialog.getRegularClass(prod);
			dialogConfig.salePrice = prod.salePrice;
			dialogConfig.customerRating = prod.customerRating;
			
			return dialogConfig;
		},
		getRegularClass: function(prod) { 
			return (prod.regularPrice !== prod.salePrice) ? "yesStrike" : "noStrike";
		},
		closeDialog: function() { 
			bbyc.config.pages.DialogView.enable = false;
			dialogConfig.enable = false;
		}
	});
})();