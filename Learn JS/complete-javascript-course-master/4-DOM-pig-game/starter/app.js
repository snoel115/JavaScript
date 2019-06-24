/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice, maxScore;

fncInit();


document.querySelector('.btn-roll').addEventListener('click', fncRollDice);
document.querySelector('.btn-hold').addEventListener('click', fncHold);
document.querySelector('.btn-new').addEventListener('click', fncInit);


function fncRollDice(){

    if (gamePlaying) {
        //1 - select the dice value randomly
        var diceNumber = Math.floor(Math.random() * 6) + 1; // select the dice between value [1..6]

        console.log('Dice = ' + diceNumber);

        //2 - display the dice result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceNumber + '.png';  //change the dice image

        //3 - update the rounded score if the dice number isn't 1
        if (diceNumber > 1) {

            console.log('previousDice = ' + previousDice + ';   diceNumber = ' + diceNumber); 
            if ((previousDice === 6) && (diceNumber === 6)) {
                    // the player got 2 six in a row, he loses his entire score and the hand is pass to the next player
                    console.log('The player ' + activePlayer + ' got 2 six in a row, so he loses everything!');
                    roundScore = 0;
                    scores[activePlayer] = 0;
                    document.querySelector('#current-' + activePlayer).textContent = 0;
                    document.getElementById('score-' + activePlayer).textContent = '0';
                    fncNextPlayer();    
            } else {
                // add score
                roundScore += diceNumber;
                previousDice = diceNumber;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            console.log('The player ' + activePlayer + ' got a 1 so the player change!');
            fncNextPlayer();
        }
    }
}
 

function fncHold(){
    if (gamePlaying){
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        var input = document.querySelector('.final-score').value;
        if (!input) {
            input = 20;
        }

        console.log(input);

        if (scores[activePlayer] >= input) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            fncNextPlayer();
        }
    
    }
 
}



function fncInit(){
    scores = [0, 0];    
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    previousDice = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');  // remove the active flag before setting is again to avoid to have the active twice
    document.querySelector('.player-0-panel').classList.add('active');     //set player 1 as active

    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
 
    
    document.querySelector('.dice').style.display = 'none';

}

function fncNextPlayer(){
       // next player
       activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
       roundScore = 0;
       previousDice = 0;
       document.getElementById('current-0').textContent = '0';
       document.getElementById('current-1').textContent = '0';
       document.querySelector('.player-0-panel').classList.toggle('active');  
       document.querySelector('.player-1-panel').classList.toggle('active');

       document.querySelector('.dice').style.display = 'none';

}

function myMaxScoreLostFocus(){
    maxScore = document.getElementById('#MaxScore').innerText;
    console.log('maxScore was changed to: ' + maxScore);
}