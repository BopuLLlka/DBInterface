$("#baseName").ready(function () {
	var tableName = $("#tableNameEdit").val();
	var baseName = $("#baseName").val();
	
	var tableInfoArray = new Array();

	GetTableInformation();


	$("#tableMenu").click(function(event){
		var item = $(event.target);
	
		if(item.attr('class') == "tableMenuItem")
		{
			$('.tableMenuItem').attr('class','tableMenuItem');
			item.attr('class','tableMenuItem activeItem');
			if(item.text()=="Обзор")
			{
				ViewTable();
			}
			if(item.text()=="Структура")
			{
				EditTable();
			}
			if(item.text()=="Вставить")
			{
				Paste();
			}
		}
	});

	function GetTableInformation() {
		$.ajax({
			type: "POST",
			url: '/Controllers/tables.php', 
			data:{
				action: 'GetTableInformation',
				baseName: baseName,
				tableNameEdit: tableName
			},
			success(data)
			{	
				tableInfoArray = $.parseJSON(data);
				ViewTable();
				//fillViewTable(data);
			},
			error(data){
				alert("УРА! но ошибка");
			}
		});
	}

	function ViewTable()
	{
		$("#tableView").css("display","block");
		$("#tableEdit").css("display","none");
		$("#tablePaste").css("display","none");
		$.ajax({
			type: "POST",
			url: '/Controllers/tables.php', 
			data:{
				action: 'View',
				baseName: baseName,
				tableNameEdit: tableName
			},
			success(data)
			{
				drawViewTable(data);				
			},
			error(data){
				alert("УРА! но ошибка");
			}
		})
	}
	function drawViewTable(json)
	{
		var titleArray = new Array();

		$.each(tableInfoArray,function (i,item) {
			titleArray.push(item[3]);
		});

		var viewContainer = $("#tableRowContainerView");
		viewContainer.html("");
		viewContainer.css("grid-template-columns","repeat("+titleArray.length+",1fr)");
		var array = $.parseJSON(json);
		console.log(array);
		$.each(titleArray,function(i,item)
		{
			viewContainer.append("<div class='tableViewTitle'>"+item+"</div>");
		});
		if(array.length==0)
		{
			viewContainer.append("<div id='emptyTableText'>Таблица пустая</div>");
		}
		$.each(array,function(i,row)
		{
			
			$.each(row,function(j,item)
			{
				viewContainer.append("<div class='tableViewElement'>"+item+"</div>");
			});

		});
	}

	function EditTable()
	{

		$("#tableView").css("display","none");
		$("#tableEdit").css("display","block");
		$("#tablePaste").css("display","none");
		drawEditTable();
		
		
	}
	function drawEditTable()
	{
		var viewContainer = $("#tableRowContainerEdit");
		viewContainer.html("<div class='tableTitleElementEdit'> </div><div class='tableTitleElementEdit'>Id</div><div class='tableTitleElementEdit'>Имя</div><div class='tableTitleElementEdit'>Тип</div><div class='tableTitleElementEdit'>Сравнение</div><div class='tableTitleElementEdit'>Атрибут</div><div class='tableTitleElementEdit'>Null</div><div class='tableTitleElementEdit'>По умолчанию</div><div class='tableTitleElementEdit'>Дополнительно</div><div class='tableTitleElementEdit'>Действие</div>");
		$.each(tableInfoArray, function(index,item)
		{
			viewContainer.append("<div class='tableElementEdit'><input type='checkbox'/></div><div class='tableElementEdit'>"+item[4]+"</div><div class='tableElementEdit'>"+item[3]+"</div><div class='tableElementEdit'>"+item[7]+"</div><div class='tableElementEdit'> </div><div class='tableElementEdit'> </div><div class='tableElementEdit'>"+item[6]+"</div><div class='tableElementEdit'> </div><div class='tableElementEdit'> </div><div class='tableElementEdit'> </div>");
		});
	}
	function Paste()
	{
		$("#tableView").css("display","none");
		$("#tableEdit").css("display","none");
		$("#tablePaste").css("display","block");

		drawPasteTable();
	}
	function drawPasteTable() {
		console.log(tableInfoArray);
		var pasteContainer = $("#tableRowContainerPaste");
		pasteContainer.html("<div class='tableTitleElementPaste'>Столбец</div><div class='tableTitleElementPaste'>Тип</div><div class='tableTitleElementPaste'>Null</div><div class='tableTitleElementPaste'>Значение</div>");
		$.each(tableInfoArray, function(index,item)
		{
			pasteContainer.append("<input class='invisible' type='text' name='fieldName"+index+"' value='"+item[3]+"'/><div class='tableElementPaste'>"+item[3]+"</div><div class='tableElementPaste'>"+item[7]+"</div><div class='tableElementPaste'><input type='checkbox'/></div><input class='tableElementPaste' name='fieldValue"+index+"' type='text'/>");
		});
	}

	$('#tablePaste').submit(function(e) {
        var $form = $(this);
        $.ajax({
          	type: 'POST',
          	url: '/Controllers/tables.php',
          	data: $form.serialize(),
          	success(data) {
          		$('.tableMenuItem').attr('class','tableMenuItem');
				$('.tableMenuItem').first().attr('class','tableMenuItem activeItem');
          		ViewTable();
			},
		  	error(data) {
          		console.log('NOOOO');
      		}	
        });
        e.preventDefault(); 
    });

});
