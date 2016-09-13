<?php
	$name = $_POST["name"];
	$email = $_POST["email"];
	$message = $_POST["message"];
	echo $message;
	mail($email, "For ".$name, $message);
?>