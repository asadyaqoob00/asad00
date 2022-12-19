<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include "config.php";

$sql = "SELECT * FROM employee";
$result = $conn->query($sql) or die("SQL Query Failed.");

if($result->num_rows > 0 ){
	
	$output =$result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($output);

}else{

 echo json_encode(array('message' => 'No Record Found.', 'status' => false));

}


?>
