<?php
//Connection
$servername = "localhost";
$username = "root";
$password = "";
// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$dbName = $_POST["dbName"];

if(!is_null($dbName))
{
	$sql = "DROP DATABASE $dbName";
	if ($conn->query($sql) === TRUE) {
	    echo json_encode("Database drop successfully");
	} else {
	    echo json_encode("Error creating database: " . $conn->error);
	}
}
else
{
	$dbName = $_GET["dbName"];

	if(!is_null($dbName))
	{
		$sql = "SHOW TABLES FROM $dbName";
		$result = mysqli_query($conn, $sql);
		if($result==true)
		{
			$tables = array();
			while($sql = mysqli_fetch_array($result))
			{
				array_push($tables, $sql[0]);
			}
			echo json_encode($tables);
		} 
		else
		{
			 echo json_encode("errorBlyat dbName=".$dbName);
		}
	}
	else{
		$postData = $_POST["data"];
		if(!is_null($postData))
		{
			$sql = "CREATE DATABASE $postData";
			if ($conn->query($sql) === TRUE) {
			    echo json_encode($postData);
			} else {
			    echo json_encode("0");
			}
		}
	}
}

$conn->close();
?>