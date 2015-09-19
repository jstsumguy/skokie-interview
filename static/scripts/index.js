$(document).ready(function() {
	/* animate status bar */
	var logout = $('#logout');

	String.prototype.capitalize = function() {
		if(this.length > 2) {
			return this.charAt(0).toUpperCase() + this.slice(1);
		}
	}

	/* Fired on login */
	if(logout.length) {
		username = $('#username').val().capitalize();
		$('#logout').animate({
			width: '150px',
			delay: 200,
			borderRadius: '20px',
		}, 1200, function() {
			textNode = document.createTextNode('Welcome ' + username);
			$('#logout').append(textNode).fadeIn('slow');
			setTimeout(function() {
				$('#logout').empty();
				$('#logout').animate({ width: '35px'}, 500, function(){});
			}, 2000)
		});
	}
})