    /******************************************************************
	 * 
	 * Developer: Satish Sekar
	 * Client: Broadband TV
	 * Assessment: Back-End Developer
	 * Description: Display a synchronous player specific point system
	 * Framework: MVC - CodeIgnitor
	 * Page: Custom JS file
	 * 
	 ********************************************************************/
	 
(function() { 
	var cycle = { 
		'timer'	 : 1,
		'interval' : 8000
	};
	
	$(document).ready( function() { 
		$("section#begin > div > button").on('click', function() { 
			$("section#begin").addClass("hide");
			$("section#list").removeClass("hide");
			autoRefresh(cycle['interval']);
		});
		
		$("section#list > table tr").on('click', function() { 
			var index = $(this).index() + 1;
			showResultsArea(index);
			$("section#list > table tr").removeClass("active");
			$("section#list > table tr:nth-child(" + index + ")").addClass("active");
		});
		
		$("section#result > div > button").on('click', function() { 
			var index = $("input#index").val();
			var player = $("section#list > table tr:nth-child(" + index + ") > td:first-child").html();
			var newPoints = parseInt($("section#list > table tr:nth-child(" + index + ") > td:last-child").html(), 10) + 5;
			
			var data = {
				"name"	 :	player,
				"points" :	newPoints
			};
			
			$.ajax({ 
				url			:	"index.php/meteorController/updatePointsByName?" + $.param(data),
				dataType	: 	"json",
				beforeSend	:	function() { 
					$("section#result").append("<img src='webroot/img/ajax-loader.gif' width='16px' height='16px' />");
				},
				success		:	function(data) { 
					var index = 1;
					for(item in data) { 
						$("section#list table tr:nth-child(" + index + ") td:last-child").html(data[item]);
						index++;
					}
				},
				complete	:	function() { 
					$("section#result > img").hide();
				}
			});
		});
		
		var showResultsArea = function(index) { 
			var player = $("section#list > table tr:nth-child(" + index + ") > td:first-child").html();
			
			$("section#result").removeClass("hide");
			$("section#result > div:first-child").html(player);
			$("input#index").val(index);
		}
		
		var autoRefresh = function(interval) { 
			cycle['timer'] = setInterval(function() { 
				$.ajax({ 
					url			:	"index.php/meteorController/updateAllPoints",
					dataType	: 	"json",
					beforeSend	:	function() { 
						
					},
					success		:	function(data) { 
						console.dir(data);
						var index = 1;
						for(item in data) { 
							$("section#list table tr:nth-child(" + index + ") td:last-child").html(data[item]).fadeIn();
							index++;
						}
					},
					complete	:	function() { 
						
					}
				});
			}, interval);
		}
		
		var stopRefresh = function() { 
			window.clearInterval(cycle['timer']);
		}
	});
})($);