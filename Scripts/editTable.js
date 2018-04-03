$("#baseName").ready(function () {
	var tableName = $("#tableNameEdit").val();
	var baseName = $("#baseName").val();
	var titleArray = new Array();

	GetColumnName();


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
	function GetColumnName() {
		$.ajax({
			type: "POST",
			url: '/Controllers/tables.php', 
			data:{
				action: 'GetColumnName',
				baseName: baseName,
				tableNameEdit: tableName
			},
			success(data)
			{	
				var tableInfoArray = $.parseJSON(data);
				$.each(tableInfoArray,function (i,item) {
					titleArray.push(item[3]);
				});
				
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
				fillViewTable(data);				
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
	}
	function Paste()
	{
		$("#tableView").css("display","none");
		$("#tableEdit").css("display","none");
		$("#tablePaste").css("display","block");
	}


	function fillViewTable(json)
	{
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
		//var i=0;
		//while(i<array.length){
		
	//		}
	}
});
