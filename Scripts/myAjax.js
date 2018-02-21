$(document).ready(function ()
{
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
	//Закрыть всплывающее окно
	$('#colseWindowBtn').click(function(){
		$("#dialogContainer").css("display","none");
	})
	//находим элемент на который нажали на странице
	$('body').click(function (event) {
	    var baseName="";
	     if($(event.target).attr('class')=="fa fa-trash deleteBtn")
	    {
	    	var row = event.target.parentElement;
	    	var leftSide = row.firstElementChild;
	    	baseName = leftSide.textContent;
	    	row.remove();
	    	deleteBase(baseName);
	    }
	    else{
			if($(event.target).attr('class')=="baseRow" || $(event.target.parentElement).attr('class')=="baseRow" )
			{
				baseName = event.target.textContent;
				console.log(baseName);
				editBase(baseName);
			}
		}
	})
	//Рисуем таблицы в всплыающем окне
	function drawTables(tables)
	{
		var dialogWindowContent=$("#dialogWindowTable");
		dialogWindowContent.html("");


		tables.forEach(function(element){
			dialogWindowContent.append("<div class='tableElement'><input class='tableElementCheckBox' type='checkBox'/><div class='tableElementName'>"+element+"</div></div>");
		});
	}
	//Открыть окно редактированя базы
	function editBase(baseName)
	{
		$("#dialogContainer").css("display","block");
		$("#dialogWindowTitleText").html(baseName);
		$.ajax({
			type:'get',                                    
			    url: 'handler.php', 
			    data: {dbName:baseName},                                                                   
			    dataType: 'json',                  
			    success: function(tables)         
			    {
			      drawTables(tables);
			      console.log("EditBase answer:success");
			      console.log(tables);
			    },
			    error: function(data)
			    {
			      $(".errorMessage").css("display","block");
			      $('#testOut').html("<p>"+data+"</p>");
			     console.log("EditBase answer:error");
			    }
		})
	}
	//Удалить таблицу 
	function deleteBase(baseName){
		console.log("deleting \""+baseName+"\" ...")
		$.ajax({  
				type:'post',                                    
			    url: 'handler.php', 
			    data: {dbName:baseName},                                                                   
			    dataType: 'json',                  
			    success: function(data)         
			    {
			      console.log(data);
			    },
			    error: function(data)
			    {
			      $(".errorMessage").css("display","block");
			      $('#testOut').html("<p>"+data+"</p>");
			      console.log("error");
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
	$("#baseTable").on('mouseover','.text', function () {
		var deleteBtn = event.target.parentElement.lastElementChild;
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
	$("#baseTable").on('mouseout','.text', function () {
	var deleteBtn = event.target.parentElement.lastElementChild;
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
	function fillTable(dbs)
	{
		for(var i = 0; i<dbs.length; i++)
		{
			$("#loader").css("display","none");
			console.log(dbs[i])
			$("#baseTable").append("<div class='baseRow'><p class='text'>"+dbs[i]+"</p><i class='fa fa-trash deleteBtn'></i></div>");
		}
	}
	$.ajax({  
			type:'get',                                    
		    url: 'dbApi.php',                                                                    
		    dataType: 'json',                  
		    success: function(data)         
		    {
		      fillTable(data);
		      console.log("success");
		    },
		    error: function(data)
		    {
		      $(".errorMessage").css("display","block");
		      $('#testOut').html("<p>"+data+"</p>");
		      console.log("error");
		    }
	});
	//Добавть базу в таблицу
	function addBaseInTable(baseName)
	{
		$("#baseTable").append("<div class='baseRow'><p  class='text'>"+baseName+"</p><i class='fa fa-trash deleteBtn'></i></div>");
	}
	//кнопка "Закрыть" в вспывающем окне с ошибко
	$(".closeBtn").click(function()
	{
			$(".errorMessage").css("display","none");
	});
	//Нажали кнопку "Создать"
	$("#createBaseForm").submit(function(event){
		console.log("submit");
		event.preventDefault();
		$.ajax({  
			type:'post',                                    
		    url: 'handler.php',                 
		    data: {data:$("#baseName").val()},                                                      
		    dataType: 'json',                  
		    success: function(data)         
		    {
		      console.log(data);
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
		      console.log("error");
		    }
		});
	});
});
