var btnColors = ["red", "blue", "green", "yellow"];
var pattern = [];
var userPattern = [];
var level = 0;
var gameStart = false;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = btnColors[randomNumber];
  pattern.push(randomColor);

var i = 0;

function sequenceLoop() {
  setTimeout(function() {
    $("#" + pattern[i]).fadeOut(100).fadeIn(100);
    playSound(pattern[i]);
    i++;
    if (i < pattern.length) {
      sequenceLoop();
    }
  }, 750)
}

  sequenceLoop();
  level++;
  $("#level-title").html("Level " + level);
}

$(".btn").click(function() {
  var userColor = this.id;
  userPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userPattern.length-1);
});

$(document).keypress(function() {
  if (!gameStart) {
    nextSequence();
    gameStart = true;
  }
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (pattern[currentLevel] === userPattern[currentLevel]) {
    console.log("success");

    if (pattern.length === userPattern.length) {
      userPattern.length = 0;
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over. Press any key to restart.")
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  pattern.length = 0;
  userPattern.length = 0;
  gameStart = false;
}
