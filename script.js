$(document).ready(() => {
	let $upperKeys = $('#keyboard-upper-container');
	let $lowerKeys = $('#keyboard-lower-container');
	let sentences = [
		'ten ate neite ate nee enet ite ate inet ent eate',
		'Too ato too nOt enot one totA not anot tOO aNot',
		'oat itain oat tain nate eate tea anne inant nean',
		'itant eate anot eat nato inate eat anot tain eat',
		'nee ene ate ite tent tiet ent ine ene ete ene ate'
	];
	let array = 0;
	let typing = sentences[array];
	let letterPlace = 0;
	let letter = typing.substring(letterPlace, letterPlace + 1);
	let timerOn = false;
	let startDate;
	let startTime;
	let errors = 0;
	$upperKeys.hide();

	$(document).keydown(e => {
		if (event.which === 16) {
			$upperKeys.show(), $lowerKeys.hide();
		}
	});

	$(document).keyup(e => {
		if (e.which === 16) {
			$upperKeys.hide(), $lowerKeys.show();
		}
	});

	$(document).keypress(e => {
		//highlight pressed key
		let key = $('#' + e.which);
		$(key).css({ backgroundColor: getRandomColor() });
		//read for keyup
		$(document).keyup(function() {
			//unhighlight released key
			$(key).css({ backgroundColor: 'transparent' });
		});
	});

	function getRandomColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}

	//current sentence and current letter
	$('#sentence').text(typing);
	$('#target-letter').text(letter);

	$(document).keypress(function(e) {
		if (timerOn === false) {
			startDate = new Date();
			startTime = startDate.getTime();
			timerOn = true;
		}
		//if typing the correct key
		if (e.which == sentences[array].charCodeAt(letterPlace)) {
			let correct = $('<span class="glyphicon glyphicon-ok"></span>');
			$(correct).appendTo('#feedback');
			//create highlight in sentence
			$('#yellow-block').css('left', '+=17.3px');
			//next letter
			letterPlace++;
			letter = typing.substring(letterPlace, letterPlace + 1);
			$('#target-letter').text(letter);
			//if sentence is complete
			if (letterPlace === typing.length) {
				array++;
				//if all sentences are complete
				if (array === sentences.length) {
					let endDate = new Date();
					let endTime = endDate.getTime();
					let minutes = (endTime - startTime) / 60000;
					wpm = Math.round(54 / minutes - 2 * errors);
					var confirmBox = confirm(
						`You typed ${wpm} words per minute! Would you like to try again?`
					);
					if (confirmBox == true) {
						location.reload();
					}
				} else {
					//changes sentence
					typing = sentences[array];
					$('#sentence').text(typing);
					letterPlace = 0;
					letter = typing.substring(letterPlace, letterPlace + 1);
					$('#target-letter').text(letter);
					$('#yellow-block').css('left', '15px');
					$('#feedback').text('');
				}
			}
		} else {
			let wrong = $('<span class="glyphicon glyphicon-remove"></span>');
			$(wrong).appendTo('#feedback');
			errors++;
		}
	});
});
