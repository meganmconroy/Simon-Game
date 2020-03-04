var started = false;
var level = 0;

$(document).keydown(function() {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []

var userClickedPattern = []


$(".btn").click(function() {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
	var recentAnswer = userClickedPattern[currentLevel]
	if (recentAnswer === gamePattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {

			setTimeout(function() {
				nextSequence()
			}, 1000)

		}
	} else {
		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over")
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);
		$("h1").text("Game Over, Press Any Key to Restart");
		started = false;
		level = 0;
		gamePattern = [];
		userClickedPattern = [];
	};


}

function playSound(fileName) {
	var audio = new Audio("sounds/" + fileName + ".mp3");
	audio.play();
}

function nextSequence() {
	userClickedPattern = []
	level++;
	$("#level-title").text("Level " + level)
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor)
	playSound(randomChosenColor, 'second', 'third')

	$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

};

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}
