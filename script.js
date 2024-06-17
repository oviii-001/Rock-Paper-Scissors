

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
const totalRounds = 5;
let playerName = '';

const choices = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

document.getElementById('startGame').addEventListener('click', () => {
    playerName = document.getElementById('playerName').value;
    if (playerName.trim() === '') {
        alert('Please enter your name to start the game.');
        return;
    }
    document.querySelector('.choices').style.display = 'block';
    document.getElementById('startGame').style.display = 'none';
    document.getElementById('restartGame').style.display = 'inline-block';
    document.getElementById('playerName').disabled = true;
    updateLiveScore();
});

document.getElementById('restartGame').addEventListener('click', () => {
    resetGame();
});

function getComputerChoice() {
    const choiceKeys = Object.keys(choices);
    const randomIndex = Math.floor(Math.random() * choiceKeys.length);
    return choiceKeys[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'tie';
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}

function playGame(userChoice) {
    if (roundCount >= totalRounds) {
        return;
    }

    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }

    roundCount++;
    displayResult(userChoice, computerChoice, winner);
    updateLiveScore();

    if (roundCount === totalRounds) {
        displayWinner();
    }
}

function displayResult(userChoice, computerChoice, winner) {
    const resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = `
        <p>Round ${roundCount}: You chose ${choices[userChoice]}, Computer chose ${choices[computerChoice]}</p>
        <p>${winner === 'tie' ? "It's a tie!" : winner === 'player' ? 'You win this round!' : 'Computer wins this round!'}</p>
    `;
}

function updateLiveScore() {
    const liveScoreDiv = document.querySelector('.liveScore');
    liveScoreDiv.innerHTML = `
        <h2>Live Score</h2>
        <p>${playerName}: ${playerScore}</p>
        <p>Computer: ${computerScore}</p>
    `;
}

function displayWinner() {
    const scoreboardDiv = document.querySelector('.scoreboard');
    let winnerMessage = '';

    if (playerScore > computerScore) {
        winnerMessage = `${playerName} wins the game!`;
    } else if (computerScore > playerScore) {
        winnerMessage = 'Computer wins the game!';
    } else {
        winnerMessage = "It's a tie game!";
    }

    scoreboardDiv.innerHTML = `
        <h2>Game Over</h2>
        <p>${winnerMessage}</p>
        <p>Final Score - ${playerName}: ${playerScore}, Computer: ${computerScore}</p>
    `;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;
    playerName = '';
    document.getElementById('playerName').value = '';
    document.getElementById('playerName').disabled = false;
    document.getElementById('startGame').style.display = 'inline-block';
    document.getElementById('restartGame').style.display = 'none';
    document.querySelector('.choices').style.display = 'none';
    document.querySelector('.result').innerHTML = '';
    document.querySelector('.liveScore').innerHTML = '';
    document.querySelector('.scoreboard').innerHTML = '';
}

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.getAttribute('data-choice');
        playGame(userChoice);
    });
});

