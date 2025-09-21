const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
let cards = [];
let firstCard = null, secondCard = null;
let lockBoard = false;

function initGame() {
    // Initialize game board
    const gameBoard = document.getElementById('game-board');
    // Makes sure there's no HTML inside of the div
    gameBoard.innerHTML = '';
    // Initializes variables as they should be when the game begins
    cards = [];
    resetBoard();
    // Creates two cards of each of the symbols
    for (let i = 0; i < symbols.length; i++) {
        cards.push(symbols[i]);
        cards.push(symbols[i]);
    }
    // Shuffles cards
    shuffleArray(cards);
    // Adds cards to the board
    for (let i = 0; i < cards.length; i++) {
        const cardElement = createCard(cards[i]);
        gameBoard.append(cardElement);
    }
    document.getElementById('restart-btn').addEventListener('click', initGame);
}

function createCard(symbol) {
    // Write your code here
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.addEventListener('click', function() {
        flipCard(this);
    });
    return card;
}

function flipCard(card) {
    // If the board is supposed to be locked or you picked the same card you already picked
    if (lockBoard || card === firstCard) return;
    // Write your code here
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    // Determines whether the flip is the first or second
    if (firstCard == null) {
        firstCard = card;
    }
    else {
        secondCard = card;
    }
    checkForMatch();
}


function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
    }
    else {
        unflipCards();
    }
}


function disableCards() {
    // Write your code here
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}
 

function unflipCards() {
    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actaully see the card so they can memorize them before they unflip
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();
