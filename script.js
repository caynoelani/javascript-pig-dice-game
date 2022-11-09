'use strict';

//DOM VARIABLES
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const player1ScoreEl = document.getElementById('score--0');
const player2ScoreEl = document.getElementById('score--1');
const player1CurrentScoreEl = document.getElementById('current--0');
const player2CurrentScoreEl = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, gameActive;

//FUNCTIONS
const init = () => {
    player1ScoreEl.textContent = 0;
    player2ScoreEl.textContent = 0;
    player1CurrentScoreEl.textContent = 0;
    player2CurrentScoreEl.textContent = 0;
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');
    player1El.classList.add('player--active');
    player2El.classList.remove('player--active');
    diceEl.classList.add('hidden');

    scores = [0 , 0];
    currentScore = 0;
    activePlayer = 0;
    gameActive = true
}

const getCurrentPlayer = () => {
    return document.getElementById(`current--${activePlayer}`);
};

const changeTurns = () => {
    currentScore = 0;
    getCurrentPlayer().textContent = currentScore;
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
}

//STARTING STATES
init();

//DICE ROLL EVENT HANDLER
rollBtn.addEventListener('click', () => {
    if(gameActive){
        const diceRoll = Math.trunc(Math.random() * 6 + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `assets/img/dice-${diceRoll}.png`;
    
        if(diceRoll !== 1){
            currentScore += diceRoll;
            getCurrentPlayer().textContent = currentScore;
        } else {
            changeTurns();
        }
    }
});

//HOLD EVENT HANDLER
holdBtn.addEventListener('click', () => {
    if(gameActive){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100){
            gameActive = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            changeTurns();
        }
    }
});

//NEW GAME EVENT HANDLER
newGameBtn.addEventListener('click', init);
