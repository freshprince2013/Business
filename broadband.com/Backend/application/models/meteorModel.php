<?php 
	/******************************************************************
	 * 
	 * Developer: Satish Sekar
	 * Client: Broadband TV
	 * Assessment: Back-End Developer
	 * Description: Display a synchronous player specific point system
	 * Framework: MVC - CodeIgnitor
	 * Page: Main model page (M)
	 * 
	 ********************************************************************/
	 
class meteorModel extends CI_Model { 
	
	const FILE = "webroot/js/input.json";
	
	/* Sets new JSON data for chosen player */
	
	function _setData($name, $point) { 
		$data = json_decode($this->_getData(), true);
		$data[$name] = $point;
		$content = json_encode($data);
		file_put_contents(self::FILE, $content);
	}
	
	/* Gets player data */
	
	function _getData() { 
		$data = file_get_contents(self::FILE);
		return $data;
	}
	
	/* Gets player names */
	
	function _getNames() { 
		return json_encode(array_keys(self::$data));
	}
	
	/* Gets player points */
	
	function _getPoints() { 
		return json_encode(array_values(self::$data));
	}
}

?>