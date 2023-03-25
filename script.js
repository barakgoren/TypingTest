// Set the target text
var targetText = document.getElementById("text").textContent.trim();

// Set up variables to keep track of time
var startTime = 0;
var elapsedTime = 0;
var intervalId = null;
var minutes = 0;
var seconds = 0;
var milliseconds = 0;

// Start the timer
function startTimer() {
    startTime = Date.now();
    intervalId = setInterval(updateTimer, 10);
}

// Stop the timer
function stopTimer() {
    clearInterval(intervalId);
}

// Update the timer display
function updateTimer() {
    elapsedTime = Date.now() - startTime;
    minutes = Math.floor(elapsedTime / 60000);
    seconds = Math.floor((elapsedTime % 60000) / 1000);
    milliseconds = elapsedTime % 1000;
    document.getElementById("time").textContent = pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds, 3);
}

// Pad the number with leading zeros
function pad(num, size=2) {
    var s = num + "";
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}


// Check the user input and update the timer if necessary
function checkInput() {
    var text = document.getElementById("text").innerHTML;
    var input = document.getElementById("input").value;
    var textLength = document.getElementById("text").innerHTML.length;
    var inputLength = document.getElementById("input").value.length;
    var userInput = document.getElementById("input").value.trim();
    if (userInput === targetText || textLength <= inputLength) {
        stopTimer();
        document.getElementById("acc").innerHTML = check(text, input) + "%";
        document.getElementById("wpm").innerHTML = wpmCheck(textLength, inputLength);
    } else if (!intervalId) {
        startTimer();
    }
}

function check(inputString, textString){
    inputString = document.getElementById("input").value;
    textString = document.getElementById("text").textContent;
    var correctCount = 0;
    for (var i = 0; i < inputString.length; i++) {
        if (inputString.charAt(i) === textString.charAt(i)) {
        correctCount++;
        }
    }
    var result = (correctCount / textString.length) * 100;
    return result;
}
function wpmCheck (inputLength, totalTime) {
    inputLength = document.getElementById("input").value.length;
    totalTime = (minutes/60) + seconds;
    var WPM = (inputLength / 5) / (totalTime / 60);
    return WPM;
}