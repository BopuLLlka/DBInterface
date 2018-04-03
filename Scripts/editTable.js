$(document).ready(function ()
{	
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
				baseName: 'Groups',
				tableNameEdit:'Artist'
			},
			success(data)
			{

				fillViewTable(data);

				console.log(data);
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
		var array = $.parseJSON(json);
		console.log(array);
		$.each(array,function(i,item))
		{
			console.log("i="+i,"item="+item);
		}
		//var i=0;
		//while(i<array.length){
		
	//		}
	}
});

