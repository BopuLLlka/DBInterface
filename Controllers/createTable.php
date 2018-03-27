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

	$i=0;
	$fieldName = $_GET["FieldName"];
	$type = $_GET["Type"];
	$default = $_GET["Default"];
	$isNullCheckBox = $_GET['isNullCheckBox'];

	$query="CREATE TABLE `".$_GET['BaseName']."` . `".$_GET["TableName"]."` ( ";
	while ($i < $_GET["TableNumbersOfColumn"])
	{
		//Запятая, если это не первая запись
		if($i!=0)
			$query .= " , ";
		
		//Имя поля
		$query .="`".$fieldName[$i]."` ";

		//Если INT или VARCHAR, то добавляем их длину в запрос
		if($type[$i]=="INT" ||  $type[$i]=="VARCHAR")
			$query .= $type[$i]."(".$_GET["Length"][$i].")";

		//Если чекбокс выбран, то NULL в остальных случаях NOT NULL 
		if($isNullCheckBox[$i] == "on")
			$query .= " NULL ";		
		else	
			$query .= " NOT NULL ";		
		
		//Если в селекте выбран NULL
		if($default[$i]=="setNull")
			$query .= " DEFAULT NULL ";
		//Если выбран CURRENT_TIMESTAMP
		if($default[$i]=="timespan")
			$query .= " DEFAULT CURRENT_TIMESTAMP ";
		
		$i++;
	}
	$query .= ") ENGINE = InnoDB;";
	echo $query;
	
	if ($conn->query($query) === TRUE) {
	    echo "Создалась";
	} else {
	    echo $conn->error;
	}

	$conn->colse();
?>