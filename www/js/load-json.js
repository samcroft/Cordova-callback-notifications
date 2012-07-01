$(document).ready(function(){
	$(document).bind('deviceready', function(){
		onDeviceReady();
	});
	
	function yourCallback(button) {
		if (button == 2) {
			dataRequest();
		}
	}
	
	function dataRequest() {
		var output = $('#output').text('Loading data...');

		$.ajax({
			url: 'http://samcroft.co.uk/demos/updated-load-data-into-phonegap/landmarks.php',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, status){
				output.empty();
				
				$.each(data, function(i,item){ 
					var landmark = '<h1>'+item.name+'</h1>'
					+ '<p>'+item.latitude+'<br>'
					+ item.longitude+'</p>';

					output.append(landmark);
				});
			},
			error: function(){
				output.text('There was an error loading the data.');
				navigator.notification.confirm(
					'Something went wrong. Would you like to retry?',
					yourCallback,
					'Error',
					'No,Yes'
				);
			}
		});
	}
	
	dataRequest();
});