$(document).ready(function ()
{	
	$("#tableMenu").click(function(event){
		var item = $(event.target);
	
		if(item.attr('class') == "tableMenuItem")
		{
			console.log(item.attr('class'));
			$('.tableMenuItem').attr('class','tableMenuItem');
			item.attr('class','tableMenuItem activeItem');
		}
	});
});