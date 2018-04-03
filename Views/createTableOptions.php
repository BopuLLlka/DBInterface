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
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-form-validator/2.3.26/jquery.form-validator.min.js"></script>
	<script type="text/javascript" src="/Scripts/createTableOptionsScript.js"></script>
	<script type="text/javascript" src="/Scripts/dialogs.js"></script>
</head>
<body>
	<div id="header"><a href="/"><div id="logo"><img src="/Images/logo.png"><img src="/Images/logo2.png"></div></a></div>
	<form id="createTableOptions" class="simpleForm" action="" method="GET">
		<div id="newTableName" class="tableTitle"><?php echo $_POST['TableName']; ?></div>
		<div id="newTableRowContainer">
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

				<input class="invisible" type="text" name="TableName" value="<?php echo $_POST['TableName'] ?>" />
				<input class="invisible" type="text" name="TableNumbersOfColumn" value="<?php echo $_POST['TableNumbersOfColumn'] ?>">
				<input class="invisible" type="text" name="BaseName" value="<?php echo $_POST['BaseName'] ?>">
			<!--</div>-->
			<?php 

				$i = 0;

				while ( $i < $_POST['TableNumbersOfColumn']) {
					echo "<input name='FieldName[".$i."]' type='text' required>
						  <select name='Type[".$i."]'>
						  	<option value='INT'>INT</option>
						  	<option value='VARCHAR'>VARCHAR</option>
						  	<option value='TEXT'>TEXT</option>
						  	<option value='DATE'>DATE</option>
						  </select>
						  <input name='Length[".$i."]' type='number'  required/>
						  <select class='defaultSelect ".$i."' name='Default[".$i."]'>
						  	<option value='nope'>Нет</option>
						  	<option value='setNull'>Null</option>
						  	<option value='timespan'>CURRENT_TIMESTAMP</option>
						  </select>
						  <select>
						 	<option></option> 
						  	<option>utf8_general_ci</option>
						  	<option>utf32_general_ci</option>
						  </select>
						  <select>
							<option></option>
						  	<option>BINARY</option>
						  	<option>UNSIGNED</option>
						  	<option>UNSIGNED ZEROFILL</option>
						  	<option>on update CURRENT_TIMESTAMP</option>
						  </select>
						  <input id='nullCheckBox".$i."' class='checkBoxCenter' type='checkBox' name='isNullCheckBox[".$i."]'/>
						  <select>
						  	<option>---</option>
						  	<option>PRIMARY</option>
						  	<option>UNIQUE</option>
						  	<option>INDEX</option>
					  		<option>FULLTEXT</option>
					  		<option>SPATIAL</option>
						  </select>
						  <input class='checkBoxCenter' type='checkBox'/>
						  <input type='text'/>";
						  $i++;
				}
			?>
		</div>
		<div class="flexButtonContainer marginPaddingAndBorderTop">
				<input type="button" name="" id="showQueryBtn" class="myBtn" value="Показать запрос"/>
				<input class="myBtn" type="submit" id="createTableBtn" value="Создать" name=""/>
		</div>
	</form>
	<div id="dialogContainer">
		<div id="dialogWindow">
			<div id="dialogWindowTitle">
				<div id="dialogWindowTitleText">Запрос</div><i class='fas fa-times colseWindowBtn'></i>
			</div>
			<div id="dialogWindowContent" class="queryText">
			</div>
		</div>
	</div>
</body>
</html>
