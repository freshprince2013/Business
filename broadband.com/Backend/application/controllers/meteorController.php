<?php 
	/******************************************************************
	 * 
	 * Developer: Satish Sekar
	 * Client: Broadband TV
	 * Assessment: Back-End Developer
	 * Description: Display a synchronous player specific point system
	 * Framework: MVC - CodeIgnitor
	 * Page: Main controller page (C)
	 * 
	 ********************************************************************/
	 
	class meteorController extends CI_Controller { 
		/* Calls this method in root directory. This method is 
		   used to display player data on the view layer */
		   
		function index() { 
			$this->load->model('meteorModel');
			$data['records'] = $this->meteorModel->_getData();
			$this->load->view('meteorView', $data);
		}
		
		/* This method is called to update new points for the selected player */
		
		function updatePointsByName() { 
			$name = trim($_GET['name']);
			$points = strval($_GET['points']);
			
			$this->load->model('meteorModel');
			$this->meteorModel->_setData($name, $points);
			$data = $this->meteorModel->_getData();
			
			echo $data;
		}
		
		/* This method is called to synchronize updated JSON data with the view panel */
		
		function updateAllPoints() { 
			$this->load->model('meteorModel');
			$data = $this->meteorModel->_getData();
			
			echo $data;
		}
	}
?>