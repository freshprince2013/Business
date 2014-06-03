/*********************************************************************************************************************************************************

	Developer: Satish Sekar
	Assessment: Front End Developer
	Client: BroadBand TV
	Description: Display live twitter feed using public API (Deprecated as of March 2013)
	Update: OAuth signature is required as part of the functionality as the old public API has been deprecated.
	Page: README.md

**********************************************************************************************************************************************************/

  ____                      _ ____                  _ _________      __
 |  _ \                    | |  _ \                | |__   __\ \    / /
 | |_) |_ __ ___   __ _  __| | |_) | __ _ _ __   __| |  | |   \ \  / / 
 |  _ <| '__/ _ \ / _` |/ _` |  _ < / _` | '_ \ / _` |  | |    \ \/ /  
 | |_) | | | (_) | (_| | (_| | |_) | (_| | | | | (_| |  | |     \  /   
 |____/|_|  \___/ \__,_|\__,_|____/ \__,_|_| |_|\__,_|  |_|      \/    
                                                                       
                                                                       

PROBLEM
=======

Create a single-page web application (SPA) that displays Twitter feeds using their public API.  Allow users to search for Tweets by hashtag.

Please use the following technologies:
Backbone.js w/ Underscore.js templating.
jQuery.
Clean, semantic HTML5 w/ CSS3.
Bonus:
Have new Tweets appear automatically.
Display a preview of media present in the Tweets (e.g. images, YouTube, etc.).
Incorporate RequireJS.

SOLUTION:
=========

NOTE: The Twitter public API has been deprecated since March 2013.
-----

Work around: I have used Twitter OAuth signature via AJAX call on remote server (PHP) in order to obtain the response array.
------------

Pages:
------

1. Main Page: index.html
2. Remote directory: root/includes/*, root/libraries/*
3. Client directory: root/webroot/*, index.html

Technology Used:
----------------

1. Server-side: PHP, AJAX (Twitter OAuth Signature - since public API is deprecated)
2. Client-side: HTML5, CSS3.0, JavaScript, jQuery, Backbone.js, underscore, js
3. Image Editing: Photoshop (AJAX loader)
4. Framework: MVC
5. Software Design Principle: Object Oriented Programming (Use of classes at root/includes/twitter.php)
6. Version Control: GIT
7. Ticketing System: Trello

Result:
-------

1. Live twitter feed display with OAuth signature/authentication.
   I have created a fake developer account on twitter to pass in the twitter tokens.

2. Have new Tweets appear automatically. The settings can be toggled on and off via Lines (68 to 72) @ /root/webroot/js/tweets.js:

   var cycle = { 
		 'timer'       : '1',
		 'interval'    : 500 * count,
		 'autorefresh' : true
   };


   ==Options==

	(a) timer: No. of cycles completed
	(b) interval: No. of seconds to complete 1 cycle
	(c) autorefresh: Toggles ON/OFF between autorefreshing live twitter feeds. Default behavior is ON.

3. Display preview of "image" media.

	If the twitter feed contains an image/photo, the "image" is display instead of the URL.


Copyright Information:
======================

Designed and developed by Satish Sekar. All right reserved.