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
	//Проверка на GET запрос
	$method = $_POST["method"];
	$dbName = $_POST["dbName"];
	$tableName = $_POST["tableName"];
	
	if(!is_null($method))
	{
		if(!is_null($dbName))
		{
			if($method == "GET")
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
					 echo json_encode("Ошибка! dbName=".$dbName);
				}
			}
		}
	}
	$conn->close();
?>