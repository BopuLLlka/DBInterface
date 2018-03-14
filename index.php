<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Interface</title>

	
	
	<link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet">
	<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="Styles/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="Styles/myStyles.css">

	<script type="text/javascript" src="Scripts/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="Scripts/bootstrap.min.js"></script>
	<script type="text/javascript" src="Scripts/myAjax.js"></script>
</head>
<body>
<div>
	<div class="errorMessage">
		<div class="errorMessageWindow">
			<div class="errorTitle">Ошибка</div>
			<div class="errorContent">
				<div   id="testOut"></div>
				<div class="btn myBtn closeBtn">Закрыть</div>
			</div>
		</div>
	</div>
	<form id="createBaseForm" class="simpleForm" action="">
	<div class="formTitle">Создать базу данных</div>
	<div class="formContent">
		<div class="form-group">
		    <label for="baseName">Название базы данных</label>
		    <input type="text" class="myInput" id="baseName" aria-describedby="emailHelp" placeholder="Введите название базы данных">
	  	</div>
	 	<button type="submit" class="myBtn" value="Create">Создать</button>
 	</div>
	</form>


	<div id="mainForm" class="simpleForm" action="index.php">
		<div class="tableTitle">Имя базы данных</div>
		<div id="baseTable"><div id="loader"><img src="Images/loader.svg"></div></div>
	</div>
	<div id="dialogContainer">
		<div id="dialogWindow">
			<div id="dialogWindowTitle">
				<div id="dialogWindowTitleText"></div><i class='fas fa-times colseWindowBtn'></i>
			</div>
			<div id="dialogWindowContent">
				<form id="createTableForm">
					<div class="createTabeTitle">Создать таблицу:</div>
					<div class="flexRowContainer">
						<div class="createTableRow">
							<label class="labelTableName" for="TableName">Имя таблицы:</label>
							<input class="tableNameInput myInput" type="text" required name="TableName"/>
						</div>
						<div class="createTableRow">
							<label class="labelNumbersOfColumn">Количество столбцов таблицы:</label>
							<input for="TableNumbersOfColumn" class="numbersOfColumn myInput" type="text" required name="TableNumbersOfColumn"/>
						</div>

					</div>
					<input type="submit" name="createTable" class="myBtn createTableBtn" value="Создать">
				</form>
				<div class="createTabeTitle">Таблица</div>
				<div id="dialogWindowTable"></div>
			</div>
	</div>
</div>
</body>
</html>
