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

	$newValues = $_POST['newValues'];
	$tableInfoArray = $_POST['tableInfoArray'];
	$updateId =$_POST['updateId'];
	$likeId = $_POST['likeId'];

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
		if($action=="GetTableInformation")
		{
			//$conn->select_db($baseName);
			$sql = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'$tableNameEdit'";
			
			$rows = array();
			if($result = $conn->query($sql))
			{
				while(($row = $result->fetch_array(MYSQLI_NUM))) {
					$rows[] = $row;
				}
				echo json_encode($rows);
			} 
			else
			{
				echo "SQL=".$sql."\nОшибочка action=".$action."\nbaseName=".$baseName."\ntableName=".$tableNameEdit."\n".$conn->error;
			}
		}
		if($action=="View")
		{
			$conn->select_db($baseName);
			$sql = "SELECT * FROM `$tableNameEdit`";
			
			$rows = array();
			if($result = $conn->query($sql))
			{
				while(($row = $result->fetch_array(MYSQLI_NUM))) {
					$rows[] = $row;
				}
				echo json_encode($rows);
			} 
			else
			{
				echo "SQL=".$sql."\nОшибочка action=".$action."\nbaseName=".$baseName."\ntableName=".$tableNameEdit.$conn->error;
			}
		}
		if($action=="Update")
		{
			$conn->select_db($baseName);
			$sql = "UPDATE `$tableNameEdit` SET "; 
			$valuesArray = json_decode($newValues);
			$infoArray = json_decode($tableInfoArray);

			$i=0;
			$isItem = true;
			while ($isItem) {
				if(!is_null($valuesArray[$i])){
					if($i!=0)
					{
						$sql .=",";
					}
					$sql.= $infoArray[$i]."=".$valuesArray[$i]." ";
					$i++;	
				}
				else{
					$isItem = false;
				}
			}

			$sql.= "WHERE $infoArray[0]=$likeId";	

			if($result = $conn->query($sql))
			{
				echo json_encode($sql);
			} 
			else
			{
				echo json_encode("error".$sql);
			}

		}
		if($action=="Edit")
		{
			$conn->select_db($baseName);
			$sql = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'$tableNameEdit'";
			
			$rows = array();
			if($result = $conn->query($sql))
			{
				while(($row = $result->fetch_array(MYSQLI_ASSOC))) {
					$rows[] = $row;
				}
				echo json_encode($rows);
			} 
			else
			{
				echo "SQL=".$sql."\nОшибочка action=".$action."\nbaseName=".$baseName."\ntableName=".$tableNameEdit.$conn->error;
			}
		}
		if($action=="Paste")
		{
			$conn->select_db($baseName);
			
			$isField = true;
			$i=0;
			$r="";
			$fieldNameTemp = $_POST["fieldName$i"];
			$fieldString = "INSERT INTO `$tableNameEdit` (";
			$valuesString = ") VALUES (";
			while($isField)
			{	
				if(!is_null($_POST["fieldName$i"]))
				{
					if($i!=0)
					{
						$fieldString .=",";
						$valuesString .=",";
					}
					$fieldString .= "`".$_POST["fieldName$i"]."`";
					$valuesString .="'".$_POST["fieldValue$i"]."'";
				}
				else
				{
					$isField=false;
				}
				$i++;
			}

			$sql = $fieldString.$valuesString.")";
			
			if($result = $conn->query($sql))
			{
				echo json_encode($sql);
			} 
			else
			{
				echo "SQL=".$sql."\nОшибочка action=".$action."\nbaseName=".$baseName."\ntableName=".$tableNameEdit.$conn->error;
			}
		}
	}
	$conn->close();
?>