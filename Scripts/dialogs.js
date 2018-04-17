$(document).ready(function ()
{
	//Закрыть всплывающее окно
	$('.colseWindowBtn').click(function(){
		$("#dialogContainer").css("display","none");
	});
	$('#dialogContainer').click(function(event){
		if(event.target.id=="dialogContainer")
		{
			$("#dialogContainer").css("display","none");
		}
	});
});

