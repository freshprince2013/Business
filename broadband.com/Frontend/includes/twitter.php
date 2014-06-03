<?php 

/**
	Developer: Satish Sekar
	Assessment: Front End Developer
	Client: BroadBand TV
	Description: Display live twitter feed using public API (Deprecated as of March 2013)
	Update: OAuth signature is required as part of the functionality. AJAX call is made to authentication the app and then return JSON response array.
	Page: Remote page sent through AJAX call to initialize Twitter OAuth Signature, pass request params and get response array (tweets.php)
**/

class twitter { 

	private $search;
	private $count;
	private $twitterToken;
	
	public function __construct() { 
		session_start();
		/** Include Twitter's OAuth Library for authentication rules as part of new API v1.1 **/
		require_once("../libraries/twitterOAuthAPI/twitteroauth/twitteroauth.php");
	}
	
	public function loadRequestParams() { 
		$this->search = $_GET['q'];
		$this->count = intval($_GET['count']);
	}
	
	public function setOAuthParams() { 
		$this->twitterToken = array ( 
			"consumerkey" => "WOcBI4q1IlPSyirXZrv0TA",
			"consumersecret" => "4ufmrUKgeMYsqHboG4rmgCmpO9r8IVZIUG6eDaEY",
			"accesstoken" => "1602407072-GOgDpq7rqQjrEKIeFeyRN0h17k7uCrMA8L08E9n",
			"accesstokensecret" => "TrEA4RTEs7v4PdEd13tHRruhn19M5pv7bYMKwmGYfB8"
		);
	}
	
	public function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
		$connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
		return $connection;
	}

	public function getResponseArray() { 
		$connection = $this->getConnectionWithAccessToken($this->twitterToken["consumerkey"], $this->twitterToken["consumersecret"], $this->twitterToken["accesstoken"], $this->twitterToken["accesstokensecret"]);
		$tweets = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=%23".urlencode($this->search)."&count=".$this->count."&include_entities=true");
		return json_encode($tweets);
	}
}

$twitter = new twitter();
$twitter->loadRequestParams();
$twitter->setOAuthParams();

echo $twitter->getResponseArray();
?>