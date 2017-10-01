$(document).ready(function() {

	$('form').on('submit', function(event) {

		$.ajax({
			data : {
				ask : $('#askInput').val(),
				answer : $('#answerInput').val()
				
			},
			type : 'POST',
			url : '/process'
		})
		.done(function(data) {
			$('#msg').val('');
			$('#answerInput').val('');
			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert').hide();
			}
			else {
				$('#successAlert').text(data.name).show();
				$('#successAlert1').hide();
				$('#errorAlert').hide();
			}

		});

		event.preventDefault();

	});

	$('a#addMsg').on('click', function(event) {

		$.ajax({
			data : {
				msg : $('#msg').val()
				
				
			},
			type : 'POST',
			url : '/addMsg'
		})
		.done(function(data) {
			$('#msg').val('');
			$('#answerInput').val('');
			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert').hide();
			}
			else {
				$('#successAlert1').text(data.name).show();
				$('#successAlert').hide();
				$('#errorAlert').hide();
				var html = '<ul class="container" >'
				for (var i = 0; i < data.list.length ; i++) {
				    console.log(data.list[i]);
				    html += '<li>'+data.list[i]+'</li>'
				    //Do something
				}
				html += '</ul>'
				// $('#varConv').text(data.list).show();
				$('#varConv').html(html);
				$('#firstConv').hide();
			}

		});

		event.preventDefault();

	});
	$('a#train').on('click', function(event) {

		$.ajax({
			data : {
				msg : $('#msg').val()
				
				
			},
			type : 'POST',
			url : '/train'
		})
		.done(function(data) {
			$('#msg').val('');
			$('#answerInput').val('');
			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert1').hide();
			}
			else {
				$('#successAlert1').text(data.name).show();
				$('#successAlert').hide();
				$('#errorAlert').hide();
			}

		});

		event.preventDefault();

	});
	$('a#delete').on('click', function(event) {

		$.ajax({
			data : {
				msg : $('#msg').val()
				
				
			},
			type : 'POST',
			url : '/delete'
		})
		.done(function(data) {
			$('#msg').val('');
			$('#answerInput').val('');
			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert1').hide();
			}
			else {
				$('#successAlert1').text(data.name).show();
				$('#successAlert').hide();
				$('#errorAlert').hide();
				var html = '<ul class="container" >'
				for (var i = 0; i < data.list.length ; i++) {
				    console.log(data.list[i]);
				    html += '<li>'+data.list[i]+'</li>'
				    //Do something
				}
				html += '</ul>'
				// $('#varConv').text(data.list).show();
				$('#varConv').html(html);
			}

		});

		event.preventDefault();

	});


});
