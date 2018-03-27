<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Interface</title>
	<!--Стили-->
	<link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet">
	<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="Styles/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="Styles/myStyles.css">
	<!--Скрипты-->
	<script type="text/javascript" src="Scripts/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.min.js"></script>
	<script type="text/javascript" src="Scripts/mainScript.js"></script>
	<script type="text/javascript" src="Scripts/dialogs.js"></script>
</head>
<body>
<div class="errorMessage">
	<div class="errorMessageWindow">
		<div class="errorTitle">Ошибка</div>
		<div class="errorContent">
			<div   id="testOut"></div>
			<div class="btn myBtn closeBtn">Закрыть</div>
		</div>
	</div>
</div>
<!--Форма создания БД-->
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
<!--Оснавная таблица-->
<div id="mainForm" class="simpleForm" action="index.php">
	<div class="tableTitle">Имя базы данных</div>
	<div id="baseTable">
		<div id="loader"><img src="Images/loader.svg"></div>
	</div>
</div>
<!--Диалоговое окно-->
<div id="dialogContainer">
	<div id="dialogWindow">
		<div id="dialogWindowTitle">
			<div id="dialogWindowTitleText"></div><i class='fas fa-times colseWindowBtn'></i>
		</div>
		
		<form id="createTableForm" onsubmit="" action="Views/createTableOptions.php" method="POST">
			<div class="createTabeTitle">Создать таблицу:</div>
			<div class="flexRowContainer">
				<input class="invisible" id="baseNameInput" type="text" name="BaseName"/>
				<div class="createTableRow">
					<label class="labelTableName" for="TableName">Имя таблицы:</label>
					<input id="tableNameInput" class=" myInput" type="text" required name="TableName" pattern="^[_A-z0-9]{1,}$" />
				</div>
				<div class="createTableRow">
					<label class="labelNumbersOfColumn">Количество столбцов таблицы:</label>
					<input class="numbersOfColumn myInput" type="text" required name="TableNumbersOfColumn"/>
				</div>

			</div>
			<div class="flexButtonContainer">
				<input type="submit" name="createTable" id="createTableBtn" class="myBtn" value="Создать">
			</div>
		</form>
			
		<div class="createTabeTitle">Таблица</div>
		<div id="dialogWindowTable"></div>
		
	</div>
</div>
</body>
</html>
