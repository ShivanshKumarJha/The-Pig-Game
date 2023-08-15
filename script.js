'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const btnPlayers = document.querySelector('.btn--players');

const modal = document.querySelector('.modal');  //for rules
const overlay = document.querySelector('.overlay');  //for overlay
const btnCloseModal = document.querySelector('.close-modal'); //for closing button of rules
const modal2 = document.querySelector('.modal2'); //for players
const btnCloseModal2 = document.querySelector('.enter-name'); //for closing the players 

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling the database functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1.Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3.Check for rolled 1 : if true, switch to next player
        if (dice !== 1) {
            // Add the dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to new player
            switchPlayer();
        }
    }
});

// Holding the score
btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to the active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if the activePlayer score >= 100
        if (scores[activePlayer] >= 20) {
            // finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch the player
            switchPlayer();
        }
    }
});

// New Game functionality
btnNew.addEventListener('click', init);


// Modals functionality
btnRules.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

btnPlayers.addEventListener('click', function () {
    modal2.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

const closeModal2 = function () {
    modal2.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnCloseModal2.addEventListener('click', function () {
    let nameOne = document.getElementById('player1--name').value;
    let nameTwo = document.getElementById('player2--name').value;
    if (nameOne !== '' && nameTwo !== '') {
        document.querySelector('#name--0').innerHTML = nameOne;
        document.querySelector('#name--1').innerHTML = nameTwo;
        closeModal2();
    } else closeModal2();
});
overlay.addEventListener('click', closeModal2);
