$(document).ready(function ()
{	
	//Ловим нажатие выбор селекта, если это NULL, то ставим галочку и в поле null
	$(".defaultSelect").change(function(e)
	{
		var select = $(e.target);
		if(select.val()=="setNull")
		{
			var index = select.attr("class").split(' ')[1];
			
			$("#nullCheckBox"+index+"").prop( "checked", true );
		}
	});

	$("#showQueryBtn").click(function(){
		sendAjaxForm("createTableOptions", "/Controllers/showQuery.php");
	});
	
	function sendAjaxForm(ajax_form, url) {
	    $.ajax({
	        url:     url, //url страницы 
	        type:     "GET", //метод отправки
	        dataType: "html", //формат данных
	        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
	        success: function(response) { //Данные отправлены успешно
	        	$("#dialogContainer").css("display","block");
	        	$("#dialogWindowContent").html(response);
	        	console.log(response);
	    	},
	    	error: function(response) { // Данные не отправлены
	            console.log('Ошибка. Данные не отправлены.');
	    	}
	 	});
	}
	
	$("#createTableOptions").submit(function(event){
		event.preventDefault();
		$.ajax({
			type: "GET",
	        url: "/Controllers/createTable.php", 
	        dataType: "html", 
	        data: $("#createTableOptions").serialize(),  // Сеарилизуем объект
	        success: function(response) { 
	        	$(location).attr('href', '/');
	        	console.log(response);
	    	},
	    	error: function(response) { 
	            console.log('Ошибка. Данные не отправлены.');
	    	}
	 	});
	});

});