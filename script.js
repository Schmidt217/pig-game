'use strict';

//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player1Score = document.getElementById('score--0');
const player2Score = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

function start() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  dice.classList.add('hidden');
  player1Score.innerText = 0;
  player2Score.innerText = 0;
  player1CurrentScore.innerText = 0;
  player2CurrentScore.innerText = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}

start();

//rolling dice functionality
function rollDice() {
  if (playing) {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;
    if (diceRoll !== 1) {
      // add dice to current score
      document.getElementById(
        `current--${activePlayer}`
      ).innerText = currentScore += diceRoll;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).innerText = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function holdButton() {
  if (playing) {
    //add score to current player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];
    // check if player's core is >= 100
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
}

roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdButton);
newGame.addEventListener('click', start);
