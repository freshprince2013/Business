    <!-------------------------------------------------------------------
	 * Developer: Satish Sekar
	 * Client: Broadband TV
	 * Assessment: Back-End Developer
	 * Description: Display a synchronous player specific point system
	 * Framework: MVC - CodeIgnitor
	 * Page: Main view page (V)
	 --------------------------------------------------------------------->

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Incremental Player Points Game</title>
	</head>
	
	<!-- Link to the custom CSS Stylesheet -->
	<link type="text/css" rel="stylesheet" href="webroot/css/meteor.css" />
	
	<!-- Includes the javascript jQuery API -->
	<script type="text/javascript" language="javascript" src="webroot/js/1.9.1/jquery.min.js"></script>
	
	<!-- Includes the custom JS file -->
	<script type="text/javascript" language="javascript" src="webroot/js/meteor.js"></script>
	
	<body>
		<article id="container">
			<section>
				<header>
					<div>Choose a Player and Add Points</div>
				</header>
				<section>
					<section id="begin">
						<div>Click on the button to start game</div>
						<div><button>Start</button></div>
					</section>
					<section id="list" class="hide">
						<table cellspacing="5" cellpadding="5">
							<?php foreach(json_decode($records) as $key=>$value) : ?>
							<tr>
								<td><?php echo $key; ?></td>
								<td><?php echo $value; ?></td>
							</tr>
							<?php endforeach; ?>
						</table>
					</section>
					<section id="result" class="hide">
						<div></div>
						<input type="hidden" id="index" val="" />
						<div>
							<button>Give 5 points</button>
						</div>
					</section>
				</section>
				<footer>
					<div>Copyright &copy; by Satish Sekar. All rights reserved.</div>
				</footer>
			</section>
		</article>
	</body>
</html>