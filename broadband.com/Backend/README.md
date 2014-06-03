/******************************************************************
 * 
 * Developer: Satish Sekar
 * Client: Broadband TV
 * Assessment: Back-End Developer
 * Description: Display a synchronous player specific point system
 * Framework: MVC - CodeIgnitor
 * Page: README page
 * 
 ********************************************************************/
  ____                      _ ____                  _ _________      __
 |  _ \                    | |  _ \                | |__   __\ \    / /
 | |_) |_ __ ___   __ _  __| | |_) | __ _ _ __   __| |  | |   \ \  / / 
 |  _ <| '__/ _ \ / _` |/ _` |  _ < / _` | '_ \ / _` |  | |    \ \/ /  
 | |_) | | | (_) | (_| | (_| | |_) | (_| | | | | (_| |  | |     \  /   
 |____/|_|  \___/ \__,_|\__,_|____/ \__,_|_| |_|\__,_|  |_|      \/    
                                                                       
                                                                       

PROBLEM
=======

Our code challenge for you will involve re-implementing the front-end and back-end functionality of the following web application: http://michael.meteor.com/

The only requirement we ask for is that it is implemented using PHP. The use of any other tool, library or framework is up to your discretion.

Bonus challenge (not required): Make your implementation automatically synchronize the scores in the view for all people who have that web page open. 

SOLUTION:
=========

Directory to execute: /broadband/Backend
---------------------

NOTE: All requirements are successfully implemented including the bonus feature.
-----

Pages:
------

1. Framework	  : MVC - CodeIgnitor
2. Model 	  (M) : application/models/meteorModel.php
3. View  	  (V) : application/views/meteorView.php
4. Controller (C) : application/controllers/meteorController.php
5. Remote directory: root/application/*
6. Client directory: root/webroot/*

Technology Used:
----------------

1. Server-side: PHP, AJAX
2. Client-side: HTML5, CSS3.0, JavaScript, jQuery
3. Image Editing: Photoshop (AJAX loader)
4. Framework: MVC - CodeIgnitor
5. Software Design Principle: Object Oriented Programming
6. Version Control: GIT
7. Ticketing System: Trello

Result:
-------

1. The points is added to the selected player and synchronized across views for all people who have the webpage open.

2. Configuration:

	(a) JSON player input file: webroot/js/input.json
	
	(b) Auto refresh interval settings:
	
		   var cycle = { 
				'timer'	 : 1,
				'interval' : 8000
			};

		( Lines 13 - 16 from webroot/js/meteor.js file )
		
   ==Options==

	(a) timer: No. of cycles completed
	(b) interval: No. of seconds to complete 1 cycle


Copyright Information:
======================

Designed and developed by Satish Sekar. All right reserved.