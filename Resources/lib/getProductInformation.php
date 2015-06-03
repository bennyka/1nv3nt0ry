<?php

	require_once 'AmazonECS.class.php';
	$client = new AmazonECS('YOUR API KEY', 'YOUR SECRET KEY', 'DE', 'YOUR ASSOCIATE TAG');
	
	$response  = $client->search(e.barcode);
	var_dump($response);
	
?>