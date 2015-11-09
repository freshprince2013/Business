/**
 * Developer: Satish Sekar
 * Controller file for the landing page
 */

 (function() { 
	$(document).ready(function() { 
		var data;
		$("div.container .content span.scr-column-1").load("src/view/category.html");
		$("div.container .content span.scr-column-2").load("src/view/product.html");
		$("div.container .content span.scr-column-3").load("src/view/dialog.html");
	});
 })();