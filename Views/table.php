<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Interface</title>
	<!--Стили-->
	<link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet">
	<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/Styles/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/Styles/myStyles.css">
	<!--Скрипты-->
	<script type="text/javascript" src="/Scripts/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.min.js"></script>
</head>
<body>
<div id="main">
	<div id="phpOut">
		<?php
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
			if($default[$i]=="timespan")
				$query .= " DEFAULT CURRENT_TIMESTAMP ";
			
			$i++;
		}
		$query .= ") ENGINE = InnoDB;";
		echo $query;
		?>
	</div>
</div>
</body>
</html>