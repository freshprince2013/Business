/**
	Developer: Satish Sekar
	Assessment: Front End Developer
	Client: BroadBand TV
	Description: Display live twitter feed using public API (Deprecated as of March 2013)
	Update: OAuth signature is required as part of the functionality. AJAX call is made to authentication the app and then return JSON response array.
	Page: Custom javascript page (tweets.js)
**/

/** Anonymous function **/
(function() { 
	/** Setup empty Array as default params for Backbone Model **/
	var Tweet = Backbone.Model.extend({ 
		defaults: function() { 
			return { 
				name: '',
				profileImg: '',
				text: ''
			}
		}
	});
	
	/** Link Backbone collection to follow model object **/
	var TweetsList = Backbone.Collection.extend({ 
		model: Tweet
	});
	
	/** Set collections object to a variable **/
	var tweets = new TweetsList();
	
	/** Initialize twitter UI/view to replace placeholder values to the ones contained in a SINGLE model object **/
	var TweetView = Backbone.View.extend({ 
		model: new Tweet(),
		tagName: "li",
		initialize: function() { 
			this.template = _.template($("#tweet-template").html());
		},
		render: function() { 
				this.$el.append(this.template(this.model.toJSON()));
				return this;
		}
	});
	
	/** Initialize a twitter view containing a collection of model objects **/
	var TweetsView = Backbone.View.extend({ 
		model: tweets,
		el: 'ul#feeds',
		initialize: function() {
			this.model.on('add', this.render, this);
		},
		render: function() { 
			var self = this;
			self.$el.html('');
			_.each(this.model.toArray(), function(tweet, i) { 
				self.$el.append((new TweetView({model: tweet})).render().$el);
			});
			return this;
		}
	});
	
	/** Trigger the code snippet when the page loads **/
	$(document).ready( function() { 
		/** Execute the functionality to update twitter feeds on form submit event **/
		$("form#form1").on( 'submit', function() { 			
			var count	= $("form#form1 > section > select > option:selected").val();
			var search = $("form#form1 > section > input[name=search]").val();
			
			var cycle = { 
				'timer'	 : '1',
				'interval' : 500 * count,
				'autorefresh' : true
			};
			
			tweets.reset();
			
			getTwitterFeeds(count, search);
			
			if(cycle['autorefresh']) {
				if(cycle['timer']) { 
					stopTimer(cycle['timer']);
				}
				console.log(cycle['timer']);
				cycle['timer'] = startTimer(cycle['timer'], cycle['interval'], count, search);
			}
			
			return false;
		});
		
		/** Call the tweets view object that contains the collection of feeds **/
		var appView = new TweetsView();
	});
	
	/** Function to handle Twitter feeds though OAuth Signature due to deprecation of the old public API **/
	var getTwitterFeeds = function(count, search) { 				
		var searchTerm = { 
			q	:	$("form#form1 input[name=search]").val(),
			count :  $("form#form1 select > option:selected").val(),
		};
		
		var feeds = '';
		
		$.ajax({ 
			url	: 'includes/twitter.php?' + $.param(searchTerm),
			dataType : 'json',
			beforeSend: function() { 
				$("form#form1").append("<section><img src='webroot/img/ajax-loader.gif' /></section>");
			},
			success : function(data) { 
				feeds = JSON.stringify(eval(data));
				
				var user = new Array();
				var tweetItem;
				console.dir(data['statuses']);
				
				for(item in data['statuses']) { 
					user["name"] = data['statuses'][item]["user"]["name"];
					user["profileImg"] = data['statuses'][item]["user"]["profile_image_url"];
					user["text"] = data['statuses'][item]["text"];
					
					try { 
						i = 0;
						
						while(data['statuses'][item]["entities"]["media"][i]) { 
							if(data['statuses'][item]["entities"]["media"][i]["type"] == "photo") { 
								var src = data["statuses"][item]["entities"]["media"][i]["media_url_https"];
								user["text"] = data["statuses"][item]["text"].replace(data["statuses"][item]["entities"]["media"][i]["url"], "<img src='" + src + ":thumb' width='150px' />");
							}
							console.dir(data['statuses'][item]);
							i++;
						}
					} catch (e) { 
						// Exception
					}
					
					tweetItem = new Tweet ({name: user["name"], profileImg: user["profileImg"], text: user["text"] });
					tweets.add(tweetItem);
				}
			},
			complete: function() { 
				$("form#form1 > section:last-child").hide();
			}
		});
	}
	
	/** Starts timer to auto refresh twitter feeds **/
	var startTimer = function(timer, interval, count, search) { 
		timer = setInterval( function() { 
			tweets.reset();
			
			getTwitterFeeds(count, search);
			console.dir(timer);
			
			var appView = new TweetsView();
		}, interval);
		
		return timer;
	}
	
	/** Stops timer **/
	var stopTimer = function(timer) { 		
		clearInterval(timer);
		console.dir("Timer stopped!");
	}
 })($);
