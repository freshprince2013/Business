/**
 * Developer: Satish Sekar
 * Controller file for the product template
 */

(function() { 
	var productURL,
		products = {};
	
	bbyc.product = $.extend(true, bbyc, { 
		getProducts:	function(cid) { 
							productURL = bbyc.config.services.root + bbyc.config.services.endpoint.products.filter.path + cid;
							
							return $.ajax({ 
										type:	"GET",
										url:	productURL,
										dataType: "json",
										error: function(xhr, textStatus, errorThrown) { 
											alert("[" + xhr + "] " + textStatus + ": " + errorThrown);
										}
									});
						},
		addEllipsis: function (inputStr, length, word) { 
			var newStr = bbyc.util.ellipsis(inputStr, length, word);
			return newStr;
        },
		getStarRatings: function(input, max, elem, sku) {
			var factor = (input/max)*80;
			return factor;
		},
		getRegularClass: function(prod) { 
			return (prod.regularPrice !== prod.salePrice) ? "yesStrike" : "noStrike";
		},
		findProduct: function(id) { 
			productDetailURL = bbyc.config.services.root + bbyc.config.services.endpoint.products.details.path + id;
			
			return $.ajax({ 
				type:	"GET",
				url:	productDetailURL,
				dataType: "json",
				error: function(xhr, textStatus, errorThrown) { 
					alert("[" + xhr + "] " + textStatus + ": " + errorThrown);
				}
			});
		},
		updateProducts : function(data) { 
			products["product"] = {};
			$.each(data.products, function(index, value) { 
				products["product"]["s" + value.sku] = value;
				products["product"]["s" + value.sku]["thumbnailFullPath"] = bbyc.config.root + "." + value.thumbnailImage;
				products["product"]["s" + value.sku]["regularClass"] = bbyc.product.getRegularClass(value);
				products["product"]["s" + value.sku]["shortName"] = bbyc.product.addEllipsis(value.name, 25, false);
				products["product"]["s" + value.sku]["shortDesc"] = bbyc.product.addEllipsis(value.shortDescription, 80, false);
				products["product"]["s" + value.sku]["custStar"] = bbyc.product.getStarRatings(value.customerRating, 5, ".customerRatingMask", value.sku);
			});
			
			var prodTempScript = $("#product-list").html();
			
			Handlebars.registerHelper('priceEq', function(v1, v2, options) { 
				return (v1 === v2) ? options.fn(this) : options.inverse(this);
			});
			
			var prodTemp = Handlebars.compile(prodTempScript);
			$("div.column-2").html(prodTemp(products));
		}
	});
	
	$(document).ready(function() { 
		var catId = $("ul.categories li").first().attr("id"),
			prodId;
		bbyc.product.getProducts(catId).done(function(data) { 
			bbyc.product.updateProducts(data);
			
			$("ul.categories a").bind("click", function(e) { 
				e.preventDefault();
				catId = $(this).parent().attr("id");
				bbyc.product.getProducts(catId).done(function(data1) { 
					bbyc.product.updateProducts(data1);
				});
			});
			
			$(document).delegate("ul.products div.titleBlock a", "click", function(e1) { 
				e1.preventDefault();
				
				prodId = $(this).parents("li").attr("id");
				
				bbyc.product.findProduct(prodId).done(function(data) { 
					var a = bbyc.dialog.openDialog(data);
					$(document).delegate("div.dialogMask, div.closeBtn", "click", function(e2) { 
						e2.preventDefault();
						bbyc.dialog.closeDialog();
						var dialogTempScript = $("#modal-dialog").html();
						
						var dialogTemp = Handlebars.compile(dialogTempScript);
						$("div.column-3").html(dialogTemp(a));
					});
					
					var dialogTempScript = $("#modal-dialog").html();
					
					var dialogTemp = Handlebars.compile(dialogTempScript);
					$("div.column-3").html(dialogTemp(a));
				});
			});
		});
	});
})();