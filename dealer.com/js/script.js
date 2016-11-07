/****************************************
	Name: Satish Sekar
	Web App: Single Page Application (SPA)
	Client: Dealer.com
****************************************/

(function() { 
	var xmlDoc;
	var langIndex;
	
	window.PF = $.extend(true, window.PF || {}, { 
		loadXMLDoc:	(function() { 
						$.ajax({ 
							type:	"GET",
							url:	"xml/language.xml",
							dataType: navigator.userAgent.match(/msie/i) ? "text" : "xml",
							accepts: { 
								xml: "text/xml",
								text: "text/xml"
							},
							success:	function(xml) { 
								xml = ( navigator.userAgent.match(/msie/i) ) ? PF.loadXMLDoc["parse"].parseXML(xml) : xml;
								xmlDoc = xml;
								
								var xmlNodes = {};
								
								xmlNodes = PF.loadXMLDoc["parse"].get(xml);
								PF.loadXMLDoc["parse"].put(xmlNodes);
								
								$("select#languages").on("change", function() { 
									xmlNodes = PF.loadXMLDoc["parse"].get(xml);
									PF.loadXMLDoc["parse"].put(xmlNodes);
								});
							},
							error: function(xhr, textStatus, errorThrown) { 
								alert("[" + xhr + "] " + textStatus + ": " + errorThrown);
							}
						}).done( function(xml) { 
							
						});
					
						return { 
							parse: { 
								parseXML: function(xml) { 
									if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
										xmlhttp = new XMLHttpRequest();
								    } else { // code for IE6, IE5
										xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
								    }
									
									xmlhttp.open("GET", "xml/language.xml", false);
									xmlhttp.send();
									xmlDoc = xmlhttp.responseXML;
									
									xml = xmlDoc;
									
									return xml;
								},
								get: function(xml) { 
									var xmlNodes = {};
									xmlNodes = $(xml).find("contents");
									
									xmlNodes = PF.loadXMLDoc["parse"].deeplinks(xmlNodes);
									
									return xmlNodes;
								},
								deeplinks: function(xmlNodes) { 
									var nodeChildren = xmlNodes.children();
									$.each(nodeChildren, function(key, value) { 
										var level = (typeof this.nodeName === 'undefined') ? "" : this.nodeName.toString();
										xmlNodes[level] = {};
										xmlNodes[level + key] = $(this);
										
										if(xmlNodes[level + key].length > 0) { 
											xmlNodes[level + key] = PF.loadXMLDoc["parse"].deeplinks(xmlNodes[level + key]);
										}
									});
									
									return xmlNodes;
								},
								put: function(xmlNodes) { 
									var nodes1 = $("article #main-content .left").children();
									var nodes2 = $("article #main-content .right").children();
									var nodes3 = $("article #footer-area").children(".lang");
									
									langIndex = $("select#languages > option:selected").data("index");
									
									$.each(nodes1, function(key, value) { 
										var limit1 = parseInt(xmlNodes["main-content0"]["press-release" + key]["caption0"]["lang" + langIndex].attr("limit"), 10);
										var limit2 = parseInt(xmlNodes["main-content0"]["press-release" + key]["content1"]["lang" + langIndex].attr("limit"), 10);
										
										limit1 = (!isNaN(limit1)) ? limit1 : 1;
										limit2 = (!isNaN(limit2)) ? limit2 : 1;
										
										$(this).find(".caption").attr("limit", limit1).html($.parseHTML(xmlNodes["main-content0"]["press-release" + key]["caption0"]["lang" + langIndex].text()));
										$(this).find(".content").attr("limit", limit2).html($.parseHTML(xmlNodes["main-content0"]["press-release" + key]["content1"]["lang" + langIndex].text()));
									});
									
									$.each(nodes2, function(key, value) { 
										var innerNodes = $(this).children(".lang");
										$.each(innerNodes, function(key1, value1) { 
											var limit1 = parseInt(xmlNodes["main-content0"]["prev-release" + (key + nodes1.length)]["item" + key1]["side-caption0"]["lang" + langIndex].attr("limit"), 10);
											var limit2 = parseInt(xmlNodes["main-content0"]["prev-release" + (key + nodes1.length)]["item" + key1]["side-content1"]["lang" + langIndex].attr("limit"), 10);
											
											limit1 = (!isNaN(limit1)) ? limit1 : 1;
											limit2 = (!isNaN(limit2)) ? limit2 : 1;
											
											$(this).find(".side-caption").attr("limit", limit1).html($.parseHTML(xmlNodes["main-content0"]["prev-release" + (key + nodes1.length)]["item" + key1]["side-caption0"]["lang" + langIndex].text()));
											$(this).find(".side-content").attr("limit", limit2).html($.parseHTML(xmlNodes["main-content0"]["prev-release" + (key + nodes1.length)]["item" + key1]["side-content1"]["lang" + langIndex].text()));
										});
									});
									
									$.each(nodes3, function(key, value) { 
										var limit1 = parseInt(xmlNodes["footer-area1"][$(this).attr("id").toString() + key]["footer-caption0"]["lang" + langIndex].attr("limit"), 10);
										var limit2 = parseInt(xmlNodes["footer-area1"][$(this).attr("id").toString() + key]["footer-content1"]["lang" + langIndex].attr("limit"), 10);
										
										limit1 = (!isNaN(limit1)) ? limit1 : 1;
										limit2 = (!isNaN(limit2)) ? limit2 : 1;
										
										$(this).find(".footer-caption").attr("limit", limit1).html($.parseHTML(xmlNodes["footer-area1"][$(this).attr("id").toString() + key]["footer-caption0"]["lang" + langIndex].text()));
										$(this).find(".footer-content").attr("limit", limit2).html($.parseHTML(xmlNodes["footer-area1"][$(this).attr("id").toString() + key]["footer-content1"]["lang" + langIndex].text()));
									});
									
									PF.truncate();
								}
							}
						}
					})(),
		truncate:	function() { 
						var lang = $(".lang").children();
						
						$.each(lang, function() { 
							var self = $(this);
							var num  = parseInt(self.attr("limit"), 10);
							var innerNodes = self.children();
							
							if(self.find("p").length > num) { 
								$("<div class='readmore'><a href='#'>read more >></a></div>").appendTo(self);
								
								$.each(innerNodes, function(index) { 
									self.find("p").eq(index).removeClass("hide show");
									(index < num) ? self.find("p").eq(index).addClass("show") : self.find("p").eq(index).addClass("hide");
									console.log(index);
								});
							}
						});
						
						$("div.readmore > a").on("click", function() { 
							var self = $(this);
							self.parent().parent().find("p.hide").slideToggle(500);
							return false;
						});
					},
		mdialog:	function() { 
						$("div.social-media a").on("click", function() { 
							self = $(this);
							var class1 = self.find("span.icon").attr("class").split(" ");
							var label1 = self.find("span.label").text();
							$("section.middle > div.mdialog > div.left > div.icon").removeClass().addClass("icon " + class1[1].toString());
							$("section.middle > div.mdialog > div.left > div.caption > span").text(label1);
							$("section.middle > div.mdialog > div.right > div.description > div:first > span").text(label1);
							$("section.middle").addClass("opacity");
							return false;
						});
						
						$("section.middle > div.mdialog > div.right > div.title > a, button.cancel, button.submit").on("click", function() { 
							$("section.middle").removeClass("opacity");
							return false;
						});
					},
		formFunctions: { 
				getInputs: function(self) { 
					var inputs = {};
					var key = '';
					
					self.find("input,textarea,select").not("input[type=submit]").each(function() { 
						key  = $(this).attr("id");
						inputs[key] = {};
						inputs[key]["tagName"] = $(this).prop("tagName");
						inputs[key]["type"] = $(this).attr("type");
						inputs[key]["value"] = $(this).val();
					});
					
					PF.formFunctions.validate(inputs);
					return inputs;
				},
				validate: function(inputs) { 
					var index = 0;
					
					$.each(inputs, function(k, el) { 
						var val = el.value;
						var error = {};
						var regex;
						var min = $(xmlDoc).find("errors > comments > valid").attr("min");
						var max = $(xmlDoc).find("errors > comments > valid").attr("max");
						
						$(xmlDoc).find("errors > comments > valid > lang > min").text(min);
						$(xmlDoc).find("errors > comments > valid > lang > max").text(max);
						
						xmlNodes = PF.loadXMLDoc["parse"].get(xmlDoc);
						
						var invalidErrorTxt = xmlNodes["errors2"][k.toLowerCase() + index]["valid0"]["lang" + langIndex].text();
						var emptyErrorTxt = xmlNodes["errors2"][k.toLowerCase() + index]["empty1"]["lang" + langIndex].text();
						
						console.log(xmlNodes["errors2"][k.toLowerCase() + index]["valid0"]["lang" + langIndex]);
						
						switch(k.toLowerCase()) { 
							case 'fullname' :   if(val != "") { 
													regex = /[a-z]{2,}$/ig;
													error[k.toLowerCase()] = (regex.test(val) === false) ? invalidErrorTxt : "";
												} else { 
													error[k.toLowerCase()] = emptyErrorTxt;
												}
												break;
							case 'phone'	:   if(val != "") { 
													regex = /^[0-9]{10}$/ig;
													error[k.toLowerCase()] = (regex.test(val) === false) ? invalidErrorTxt : "";
												} else { 
													error[k.toLowerCase()] = emptyErrorTxt;
												}
												break;
							case 'email'	:   if(val != "") { 
													regex = /[a-z0-9.-_]+[@]{1}[a-z]+[.]{1}[a-z]{1,4}$/ig;
													error[k.toLowerCase()] = (regex.test(val) === false) ? invalidErrorTxt : "";
												} else { 
													error[k.toLowerCase()] = emptyErrorTxt;
												}
												break;
							case 'comments'	:   if(val != "") { 
													error[k.toLowerCase()] = ( (val.length < min) || (val.length > max) ) ? (invalidErrorTxt) : "";
												} else { 
													error[k.toLowerCase()] = emptyErrorTxt;
												}
												break;
						}
						
						$("#" + k.toString().toLowerCase()).parent().parent().find("span.errorMsg").remove();
						if(error[k.toString().toLowerCase()] != "") { 
							$("#" + k.toString().toLowerCase()).parent().addClass("error");
							$("#" + k.toString().toLowerCase()).parent().parent().append("<span class='errorMsg'>" + error[k.toString().toLowerCase()] + "</span>");
						} else { 
							$("#" + k.toString().toLowerCase()).parent().removeClass("error");
							$("#" + k.toString().toLowerCase()).parent().parent().find("span.errorMsg").remove();
						}
						
						index++;
						console.log(error);
					});
				}
		   }
		});
	
	$(document).ready( function() { 
		var self = $(this);
		try {
			var selectedIndex = $("body select#languages").msDropDown({disabledOptionEvents: false}).data("dd");
		} catch(e) {
			alert(e.message);
		}
		
		PF.mdialog();
		$("form").on("submit", function() { 
			var inputs = PF.formFunctions.getInputs($(this));
		});
	});
})($);