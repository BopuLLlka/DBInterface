var tableName;
var baseName;
var tableInfoArray = new Array();

$("#baseName").ready(function () {
	tableName = $("#tableNameEdit").val();
	baseName = $("#baseName").val();
	
	

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
				drawViewTable(data,tableInfoArray);				
			},
			error(data){
				alert("УРА! но ошибка");
			}
		})
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

function drawViewTable(json,tableInfoArray)
{
	var titleArray = new Array();

	$.each(tableInfoArray,function (i,item) {
		titleArray.push(item[3]);
	});

	var viewContainer = $("#tableRowContainerView");
	viewContainer.html("");
	var repeatNumber = titleArray.length+1;
	viewContainer.css("grid-template-columns","repeat("+repeatNumber+",1fr)");
	var fieldsArray = $.parseJSON(json);

	$.each(titleArray,function(i,item)
	{
		viewContainer.append("<div class='tableViewTitle'>"+item+"</div>");
	});
	viewContainer.append("<div class='tableViewTitle'>Действие</div>");
	if(fieldsArray.length==0)
	{
		viewContainer.append("<div id='emptyTableText'>Таблица пустая</div>");
	}
	$.each(fieldsArray,function(i,row)
	{
	
		$.each(row,function(j,item)
		{
			viewContainer.append("<input type='text' name='newValue"+i+"-"+j+"' id='input"+i+"-"+j+"' class='tableViewElement notActive' value='"+item+"'/>");
		});
	
		viewContainer.append("<div class='tableViewElement tableButtonBlock' id='tableActionBlock"+i+"'><i class='far fa-edit editElementBtn' onClick='editFields("+i+","+JSON.stringify(row)+")'></i><i class='fas fa-times deleteElementBtn'></i></div>");
	});
}
function editFields(i,row) {
	var likeId = $("#input0-0").val();
	$.each(row,function(index,item){
		$("#input"+i+"-"+index).attr("class","tableViewElement");
		$("#tableActionBlock"+i).html(" ");
		$("#tableActionBlock"+i).append("<input class='myBtn' type='submit' onClick='saveChanges("+i+","+JSON.stringify(row)+","+likeId+")' value='Сохранить'/>")
	});
	console.log(row);
}
function saveChanges(i,row,likeId) {
	var newValuesArray = new Array;
	$.each(row,function(index,item){
		newValuesArray.push($("#input"+i+"-"+index).val());
	});
	console.log(newValuesArray);
	console.log(tableName);
	console.log(tableInfoArray[i]);
	console.log("likeId="+likeId);
	$.ajax({
		type:'post',
		url: '/Controllers/tables.php',
		data:
		{
			action: 'Update',
			baseName: baseName,
			tableNameEdit: tableName,
			updateId:i,
			likeId:likeId,
			newValues:JSON.stringify(newValuesArray),
			tableInfoArray:JSON.stringify(tableInfoArray[i])
		},
		success(data) {
			console.log(data);
		}
	})
}


