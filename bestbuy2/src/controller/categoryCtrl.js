/**
 * Developer: Satish Sekar
 * Controller file for the category template
 */

(function() { 
	var categoryURL,
		categories = {};
	
	bbyc.category = $.extend(true, bbyc, { 
		getCategories:	function() { 
							categoryURL = bbyc.config.services.root + bbyc.config.services.endpoint.categories.path;
							
							return $.ajax({ 
										type:	"GET",
										url:	categoryURL,
										dataType: "json",
										error: function(xhr, textStatus, errorThrown) { 
											alert("[" + xhr + "] " + textStatus + ": " + errorThrown);
										}
									});
						},
		addEllipsis: function (inputStr, length, word) {
            var newStr = bbyc.util.ellipsis(inputStr, length, word);
			return newStr;
        }
	});
	
	$(document).ready(function() { 
		bbyc.category.getCategories().done(function(data) { 
			categories["category"] = {};
			$.each(data.subCategories, function(index, value) { 
				categories["category"][index] = {id: value.id, name: bbyc.addEllipsis(value.name, 18, false)};
			});
			
			var catTempScript = $("#category-list").html();
			var catTemp = Handlebars.compile(catTempScript);
			$("div.column-1").html(catTemp(categories));
		});
	});
})();