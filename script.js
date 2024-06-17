


document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const resultDiv = document.getElementById('result');

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const userChoice = choice.id;
            const computerChoice = getComputerChoice();
            const winner = determineWinner(userChoice, computerChoice);
            displayResult(userChoice, computerChoice, winner);
        });
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'It\'s a tie!';
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'You win!';
        } else {
            return 'You lose!';
        }
    }

    function displayResult(userChoice, computerChoice, winner) {
        const userChoiceIcon = getChoiceIcon(userChoice);
        const computerChoiceIcon = getChoiceIcon(computerChoice);

        resultDiv.innerHTML = `
            <p>You chose: <strong>${userChoiceIcon}</strong></p>
            <p>Computer chose: <strong>${computerChoiceIcon}</strong></p>
            <p>${winner}</p>
        `;
        resultDiv.classList.add('show');
        setTimeout(() => {
            resultDiv.classList.remove('show');
        }, 3000);
    }

    function getChoiceIcon(choice) {
        switch (choice) {
            case 'rock':
                return '✊';
            case 'paper':
                return '✋';
            case 'scissors':
                return '✌️';
            default:
                return '';
        }
    }
});


