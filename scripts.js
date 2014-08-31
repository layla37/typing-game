// wrapped in self-invoking function to avoid global variables
(function(){
	var points = 0;
	var timerLetters;
	var letterSpeed = 1000;

	// create random letter
	var randLetter = function(){
		var randNum = Math.floor((Math.random() * 26));
		var letter = String.fromCharCode(65+randNum).toLowerCase();
		return letter;
	};

	var appendNewLetter = function(){
		// If the oldest letter reaches the far right of the container, end the game
		if (($("#main").width() === $("#container").width()) && ($("#main").width() > "300")){
			endGame();
		}

		// use randLetter to generate a new random letter
		x = randLetter();
		// create a new div with the class equal to the letter, and inner HTML equal to the letter
		d = $("<div></div>").addClass(x).addClass("letterDiv");
		d.html(x);
		// append the new div to the #main div
		$("#main").prepend(d);
	};

	// shift all letters to the right by 10px
	var shiftLetters = function(){
		$(".letterDiv").first().css({"marginLeft":"10px"});
	};

	var deleteLetter = function(key){
		var letterClass = "." + key;
		if (!$(letterClass).hasClass(key)){
			points -= 1;
		}
		else{
			$(letterClass).last().remove();
			points += 1;
		}	
		$("#totalPoints").html(points);

		if (points % 20 === 0){
			clearInterval(timerLetters);
			letterSpeed *= 1.1;
			timerLetters = setInterval(appendNewLetter, letterSpeed);
		}
	}

	var endGame = function(){
		clearInterval(timerLetters);
		$(".letterDiv").remove();
		$("#main").hide();
		alert("Game Over! Total Points: " + points);
		location.reload();
	};


	$(document).ready(function(){
		
		$(document).on("keydown", function(e) {
		    var key = String.fromCharCode(e.keyCode).toLowerCase();
		    console.log(key);
		    	if (e.keyCode === 27){
					endGame();
				}
		    deleteLetter(key);                   
		});	

		$("#startButton").click(function(){	
			// create and append new random letter to #main	
			timerLetters = setInterval(appendNewLetter, letterSpeed);

			// every 100 milliseconds, shift all letters to the right
			var timerShiftLetters = setInterval(shiftLetters, 100);
		});

	});

}());

