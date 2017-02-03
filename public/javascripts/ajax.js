$(document).ready(function () {
	$("#chat").click(function() {
		console.log('click');
		$.ajax({
			url: '/connect',
			data: {
			},
			type: 'GET',
			success: function() {
			},
			error: function(xhr, status, error) {
				console.log("Uh oh there was an error: " + error);
			}
		});
		$('#chat').remove();
		$('#chat-container').append("<a class=\"btn-large disabled valign\" style=\"width:100%\">Searching...</a>");
	});
});

$(document).ajaxStop(function(){
    window.location.reload();
});