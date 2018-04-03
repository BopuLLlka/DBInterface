<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Interface</title>
	<!--Стили-->
	<link rel="shortcut icon" href="/Images/favicon.png" type="image/png">
	<link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet">
	<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/Styles/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/Styles/myStyles.css">
	<!--Скрипты-->
	<script type="text/javascript" src="/Scripts/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="/Scripts/editTable.js"></script>
</head>
<body>
<div id="header"><a href="/"><div id="logo"><img src="/Images/logo.png"><img src="/Images/logo2.png"></div></a></div>
<div id="tablePage">
	<input class="invisible" id="tableNameEdit" type="text" name="tableName" value="<?php echo $_POST['tableName'] ?>" />
	<input class="invisible" id="baseName" type="text" name="baseName" value="<?php echo $_POST['baseName'] ?>">

	<div id="tableMenu" ><div class="tableMenuItem activeItem" >Обзор</div><div class="tableMenuItem">Структура</div><div class="tableMenuItem">Вставить</div></div>
	<div id="tablePageForm" >
		<div id="tableName" >Таблица: <?php echo $_POST['tableName']; ?></div>
		<div id="tableView">
			<div id="tableRowContainerView">

			</div>
		</div>
		<div id="tableEdit">
			<div class="tableRowContainer">
				<!--<div id="newTableRowContainerTitle">-->
					<div class="newTableTitleElement">Имя</div>
					<div class="newTableTitleElement">Тип</div>
					<div class="newTableTitleElement">Длина/Значения</div>
					<div class="newTableTitleElement">По умолчанию</div>
					<div class="newTableTitleElement">Сравнение</div>
					<div class="newTableTitleElement">Атрибут</div>
					<div class="newTableTitleElement">Null</div>
					<div class="newTableTitleElement">Индекс</div>
					<div class="newTableTitleElement">A_I</div>
					<div class="newTableTitleElement">Комментарии</div>
			</div>
		</div>
		<div id="tablePaste">
			<div>
				ВСТАВИТЬ!
			</div>
		</div>

			
</div>
</body>
</html>