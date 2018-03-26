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
	})


});