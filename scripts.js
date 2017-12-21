(function(){
  let points = 0;
  let timerLetters;
  let letterDisplayInterval = 400;
  const startButton = document.getElementById('startButton');

  const mainDiv = document.getElementById('main');

  // create random letter
  const randLetter = function() {
    const randNum = Math.floor((Math.random() * 26));
    const letter = String.fromCharCode(65+randNum).toLowerCase();
    return letter;
  };

  const appendNewLetter = function() {
    const container = document.getElementById('container');
    const mainDivWidth = mainDiv.clientWidth;
    // if the oldest letter reaches the far right of the container, end the game
    if (mainDivWidth === container.clientWidth && mainDivWidth > '300') {
      endGame();
      return;
    }
    // use randLetter to generate a new random letter
    const letter = randLetter();
    // create a new div with the class equal to the letter, and innerText equal to the letter
    const newDiv = document.createElement('div');
    newDiv.className = 'letterDiv ' + letter;
    newDiv.innerText = letter;
    // append the new div to the #main div
    mainDiv.appendChild(newDiv);
  };

  // shift all letters to the right by 10px
  const shiftLetters = function() {
    const letterDiv = document.getElementsByClassName('letterDiv');

    if (letterDiv.length > 0) {
      letterDiv[0].style.marginLeft = '10px';
    }
  };

  const deleteLetter = function(key) {
    let letterClass = document.getElementsByClassName(key);

    if (letterClass.length === 0) {
      points -= 1;
    }
    else {
      letterClass[0].remove();
      points += 1;
    }

    document.getElementById('totalPoints').innerText = points;
    // spped up the rate of letters appearing after every additonal 10 points received
    if (points !== 0 && points % 10 === 0) {
      clearInterval(timerLetters);
      letterDisplayInterval *= .8;
      timerLetters = setInterval(appendNewLetter, letterDisplayInterval);
    }
  }

  const endGame = function() {
    clearInterval(timerLetters);
    mainDiv.style.display = 'none';
    alert('Game Over! Total Points: ' + points);
    location.reload();
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      endGame();
      return;
    }
    deleteLetter(e.key);
  });

  startButton.addEventListener('click', function() {
    // create and append new random letter to #main
    timerLetters = setInterval(appendNewLetter, letterDisplayInterval);
    // every 100 milliseconds, shift all letters to the right
    setInterval(shiftLetters, 100);
  });
}());
