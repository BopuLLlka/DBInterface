$(document).ready(function ()
{
	var isEmpty = true;

	//Свойство для красивого удаления
	Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
	}
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	    for(var i = this.length - 1; i >= 0; i--) {
	        if(this[i] && this[i].parentElement) {
	            this[i].parentElement.removeChild(this[i]);
	        }
	    }
	}
	//находим элемент на который нажали на странице
	$('body').click(function (event) {
	    var baseName="";
	     if($(event.target).attr('class')=="fas fa-trash-alt deleteBtn")
	    {
	    	var row = event.target.parentElement;
	    	var leftSide = row.firstElementChild;
	    	baseName = leftSide.textContent;
	    	row.remove();
	    	
	    	if($("#baseTable").html()=="")
	    	{
	    		isEmpty = true;
	    		$("#baseTable").append("<p class='emptyBaseTableText'>Пока нет баз данных!</p>");
	    	}
	    	deleteBase(baseName);
	    }
	    else{
			if($(event.target).attr('class')=="baseRow" || $(event.target.parentElement).attr('class')=="baseRow" )
			{
				baseName = event.target.textContent;
				editBase(baseName);
			}
		}
	})
	//Рисуем таблицы в всплыающем окне
	function drawTables(tables, baseName)
	{
		var dialogWindowContent=$("#dialogWindowTable");
		dialogWindowContent.html("");
		tables.forEach(function(element){
			dialogWindowContent.append("<form action='/Views/editTable.php' method='POST' class='tableElement'><input class='tableElementCheckBox' type='checkBox'/><input type='text' class='invisible' name='baseName' value='"+baseName+"'><input type='text' class='invisible' name='tableName' value='"+element+"'><input type='submit' class='dropStyles tableElementName' value='"+element+"' /></form>");
		});
	}
	//Открыть окно редактированя базы
	function editBase(baseName)
	{
		$("#baseNameInput").val(baseName);
		$("#dialogContainer").css("display","block");
		$("#dialogWindowTitleText").html(baseName);
		$.ajax({
			type:'POST',                                    
			    url: 'Controllers/tables.php', 
			    data: 
			    {
			    	method: "GET",
			    	dbName: baseName
			    },  
			    dataType: 'json',                                                                            
			    success: function(tables)         
			    {
			      drawTables(tables,baseName);
			    },
			    error: function(data)
			    {
			      $(".errorMessage").css("display","block");
			      $('#testOut').html("<p>"+data+"</p>");
			    }
		})
	}
	//Удалить таблицу 
	function deleteBase(baseName){
		$.ajax({  
				type:'POST',                                    
			    url: 'Controllers/bases.php', 
			    data:
			    {
			    	method:"DELETE",
			    	dbName:baseName
			    },                                                                               
			    success: function(data)         
			    {
			  
			    },
			    error: function(data)
			    {
			      $(".errorMessage").css("display","block");
			      $('#testOut').html("<p>"+"Какая-то ошибка дропа!"+data+"</p>");
			  
			    }
		});
	}
	////Огромный обработчик для появления кнопки удаления при наведении на строку.
	//Ищем строчку на которую навели мышкой
	$("#baseTable").on('mouseover','.baseRow', function () {
	 	var deleteBtn = event.target.lastElementChild;
	 	if(deleteBtn!=null)
	 	{
	 		$(deleteBtn).css("display","block");
	 	}
	});
	$("#baseTable").on('mouseover','.deleteBtn', function () {
		var deleteBtn = event.target;
	 	if(deleteBtn!=null)
	 	{
	 		$(deleteBtn).css("display","block");
	 	}
	});
 	$("#baseTable").on('mouseout','.baseRow', function () {
		var deleteBtn = event.target.lastElementChild;
		 	if(deleteBtn!=null)
		 	{
		 		$(deleteBtn).css("display","none");
		 	}
	});
	$("#baseTable").on('mouseout','.deleteBtn', function () {
		var deleteBtn = event.target;
	 	if(deleteBtn!=null)
	 	{
	 		$(deleteBtn).css("display","none");
	 	}
	});
	////Конец этого неадекватного обработчика...
	
	//Заполнить таблицу
	function fillBasesTable(dbs)
	{
		$("#baseTable").html("");
		if(dbs.length==0)
		{
			$("#baseTable").append("<p class='emptyBaseTableText'>Пока нет баз данных!</p>");
			isEmpty=true;
		}
		else
		{
			isEmpty=false;
		}
		for(var i = 0; i<dbs.length; i++)
		{
			$("#baseTable").append("<div class='baseRow'><p class='text'>"+dbs[i]+"</p><i class='fas fa-trash-alt deleteBtn'></i></div>");
		}
	}
	$.ajax({  
			type:'POST',
			data:{ method:"GET"},                                    
		    url: 'Controllers/bases.php',                                                                    
		    dataType: 'json',                  
		    success: function(data)         
		    {
		      fillBasesTable(data);
		    },
		    error: function(data)
		    {
		      $(".errorMessage").css("display","block");
		      $('#testOut').html("<p>"+data+"</p>");
		    }
	});
	//Добавть базу в таблицу
	function addBaseInTable(baseName)
	{
		if(isEmpty)
		{
			$("#baseTable").html("");
			isEmpty=false;
		}
		$("#baseTable").append("<div class='baseRow'><p  class='text'>"+baseName+"</p><i class='fas fa-trash-alt deleteBtn'></i></div>");
		//test("Добавляем элемент",function(){
		//var baseTable = $("#baseTable");
		//	baseTable.append("<div class='baseRow'><p  class='text'>"+baseName+"</p><i class='fas fa-trash-alt deleteBtn'></i></div>");
		///	equal($("div",baseTable).length, 1,"Успешно добавлен");		
		//});
	}
	//кнопка "Закрыть" в вспывающем окне с ошибкой
	$(".closeBtn").click(function()
	{
		$(".errorMessage").css("display","none");
	});
	
	//Нажали кнопку "Создать"
	$("#createBaseForm").submit(function(event){
		
		event.preventDefault();
		$.ajax({  
			type:'post',                                    
		    url: 'Controllers/bases.php',                 
		    data: 
		    {
		    	method:"PUT",
		    	dbName:$("#baseName").val()
		    },  
		    dataType: 'json',                                                                     
		    success: function(data)         
		    {
		     
		      if(data!="0")
		      {
		      	addBaseInTable(data);
		      }
		      else{
		      	$(".errorMessage").css("display","block");
		        $('#testOut').html("<p>"+"Что-то случилось, пока я не буду давать точно информации, ибо я не умею..."+"</p>");
		      }
		    },
		    error: function(data)
		    {
		      $(".errorMessage").css("display","block");
		      $('#testOut').html("<p>"+data+"</p>");
		    }
		});
	});
});


