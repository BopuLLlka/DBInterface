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

	//Эти данные с главной страницы
	$method = $_POST["method"];
	$dbName = $_POST["dbName"];
	$tableName = $_POST["tableName"];
	
	//Эти данные призодят со старницы редактирования базы
	$action = $_POST['action'];
	$baseName = $_POST['baseName'];
	$tableNameEdit = $_POST['tableNameEdit'];

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
	if(!is_null($action))
	{
		if($action=="View")
		{
			$conn->select_db($baseName);
			$sql = "SELECT * FROM $tableNameEdit";
			
			if($result = $conn->query($sql))
			{
				echo json_encode($result->fetch_array());
			} 
			else
			{
				echo "ошибочка action=".$action."\nbaseName=".$baseName."\ntableName=".$tableNameEdit;
			}
		}
		if($action=="Edit")
		{
			echo "Редактировать!";
		}
		if($action=="Paste")
		{
			echo "Вставить";
		}

	}
	$conn->close();
?>