$(document).ready(function() {
	/* animate status bar */
	var logout = $('#logout');
	var login = $('#login');

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
			borderRadius: '20px',
		}, 900, function() {
			textNode = document.createTextNode('Welcome ' + username);
			$('#logout').append(textNode).fadeIn('slow');
			setTimeout(function() {
				$('#logout').empty();
				$('#logout').animate({ width: '35px'}, 500, function(){});
			}, 1500)
		});
	}

	/* Fired on not logged in */
	if(login.length) {
		$('#login').animate({
			width: '150px',
			borderRadius: '20px',
		}, 900, function() {
			textNode = document.createTextNode('Login');
			$('#login').append(textNode).fadeIn('slow');
			setTimeout(function() {
				$('#login').empty();
				$('#login').animate({ width: '35px'}, 500, function(){});
			}, 1500)
		});
	}
})