let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

$(document).on("keypress", function() {
  if (level === 0) {
    nextSequence();
  } else {
    console.log(level);
  }
});

$("div[type='button']").on("click", function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});



/* FUNCTIONS */

function checkAnswer() {
  let i = userClickedPattern.length - 1;
  if (gamePattern[i] != userClickedPattern[i]) {
    $("h1").text("Game Over! Press any key to Restart");
    playSound("wrong");
    animateGameOver();
    startOver();
  } else if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    }, 2000);
  }
}


function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level += 1;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over").removeClass("game-over")
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
