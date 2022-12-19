<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];

include "config.php";

$sql = "INSERT INTO employee(name, email) VALUES ('{$name}','{$email}')";

if($conn->query($sql)){
	echo json_encode(array('message' => 'Employee Record Inserted.', 'status' => true));

}else{

 echo json_encode(array('message' => 'Employee Record Not Inserted.', 'status' => false));

}
?>
