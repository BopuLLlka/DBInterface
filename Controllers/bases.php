<?php
	//Connection
	$servername = "localhost";
	$username = "root";
	$password = "";

	//Create connection
	$conn = new mysqli($servername, $username, $password);
	//Check connection
	if ($link->connect_error) {
	    die("Connection failed: " . $link->connect_error);
	}

	$dbName = $_POST["dbName"];	
	$method = $_POST["method"];

	//Проверочка, что метод пришёл
	if(!is_null($method))
	{
		//Проверочка, что есть имя базы
		if(!is_null($dbName))
		{
			//Если удаляем базу
			if ($method === 'DELETE') {
				$sql = "DROP DATABASE $dbName";
				if ($conn->query($sql) === TRUE){
				    echo json_encode('Database drop successfully');
				} else {
				    echo json_encode('Error drop database: '. $conn->error);
				}
			}
			//Если добавляем базу
			if($method === 'PUT')
			{
				$sql = "CREATE DATABASE $dbName";
				if ($conn->query($sql) === TRUE) {
				    echo json_encode($dbName);
				} else {
				    echo json_encode("0");
				}
			}
		}
		//Если получаем базы
		if($method === 'GET'){
			//Показать все базы
			$sql="SHOW DATABASES";

			$array = array();
			if (!($result=mysqli_query($conn,$sql)))
			{
			        printf("Error: %s\n", mysqli_error($conn));
			}
			while( $row = mysqli_fetch_row( $result ) )
			{
				if (($row[0]!="information_schema") && ($row[0]!="mysql"))
				{
				    array_push($array, $row[0]);
				}
			}

			echo json_encode($array);
		}
	}

	$conn->close();
?>