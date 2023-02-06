function buildDeck() {
    let deck = [];
    let colours = ["Red", "Green", "Yellow", "Blue"];
    let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "Draw Two", "Skip", "Reverse"];
    let wilds = ["Wild", "Wild Draw Four"];
    for (let colour of colours) {
        for (let value of values) {
            let cardVal = `${colour} ${value}`;
            deck.push(cardVal);
            if (value !== 0) {
                deck.push(cardVal);
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        deck.push(wilds[0]);
        deck.push(wilds[1]);
    }
    return deck;
}

let unoDeck = buildDeck()

function shuffleDeck(deck) {
    for (let cardPos = 0; cardPos < deck.length; cardPos++) {
        let randPos = Math.floor(Math.random() * 108);
        [deck[cardPos], deck[randPos]] = [deck[randPos], deck[cardPos]];
    }
    return deck;
}
//shuffleDeck(unoDeck)
unoDeck = shuffleDeck(unoDeck)

function drawCards(numCards) {
    let cardsDrawn = [];
    for (let x = 0; x < numCards; x++) {
        cardsDrawn.push(unoDeck.shift());
    }
    return cardsDrawn;
}

function showHand(player, playerHand) {
    console.log(`Player ${player + 1}'s Turn`);
    console.log("Your Hand");
    console.log("------------------");
    let y = 1;
    for (let card of playerHand) {
        console.log(`${y}) ${card}`);
        y++;
    }
    console.log("");
}

function canPlay(colour, value, playerHand) {
    for (let card of playerHand) {
        if (card.includes("Wild")) {
            return true;
        } else if (card.includes(colour) || card.includes(value)) {
            return true;
        }
    }
    return false;
}



let discards = [];

let players = [];
let colours = ["Red", "Green", "Yellow", "Blue"];
let numPlayers = parseInt(prompt("How many players?"));
while (numPlayers < 2 || numPlayers > 4) {
    numPlayers = parseInt(prompt("Invalid. Please enter a number between 2-4. How many players? "));
}
for (let player = 0; player < numPlayers; player++) {
    players.push(drawCards(5));
}
console.log(players)

let playerTurn = 0;
let playDirection = 1; /// -1 
let playing = true;
discards.push(unoDeck.shift());
let splitCard = discards[0].split(" ", 1);
let currentColour = splitCard[0];
let cardVal = splitCard[0] === "Wild" ? "Any" : splitCard[1];

while (playing) {
    showHand(playerTurn, players[playerTurn]);
    console.log(`Card on top of discard pile: ${discards[discards.length - 1]}`);
    if (canPlay(currentColour, cardVal, players[playerTurn])) {
        let cardChosen = parseInt(prompt("Which card do you want to play?"));

        while (!canPlay(currentColour, cardVal, [players[playerTurn][cardChosen - 1]])) {
            cardChosen = parseInt(prompt("Not a valid card. Which card do you want to play?"));
        }
        console.log(`You played ${players[playerTurn][cardChosen - 1]}`);
        discards.push(players[playerTurn].splice(cardChosen - 1, 1)[0]);
        ///////////////////////
        //splitCard = discards[0].split(" ", 1)
        splitCard = discards[discards.length - 1].split(" ", 1);
        currentColour = splitCard[0]
        if (splitCard.length === 1) {
            cardVal = "Any";
        } else {
            cardVal = splitCard[1];
        }
        if (currentColour === "Wild") {
            for (let x = 0; x < colours.length; x++) {
                console.log(`${x + 1}) ${colours[x]}`);
            }
            let newColour = parseInt(prompt("What colour would you like to choose?"));
            while (newColour < 1 || newColour > 4) {
                newColour = parseInt(prompt("Invalid option. What colour would you like to choose?"));
            }
            currentColour = colours[newColour - 1];
        }
        if (cardVal === "Reverse") {
            playDirection *= -1;
        } else if (cardVal === "Skip") {
            playerTurn += playDirection;
            if (playerTurn >= numPlayers) {
                playerTurn = 0;
            } else if (playerTurn < 0) {
                playerTurn = numPlayers - 1;
            }
        } else if (cardVal === "Draw Two") {
            let playerDraw = playerTurn + playDirection;
            if (playerDraw === numPlayers) {
                playerDraw = 0;
            } else if (playerDraw < 0) {
                playerDraw = numPlayers - 1;
            }
            players[playerDraw] = players[playerDraw].concat(drawCards(2));
        } else if (cardVal === "Draw Four") {
            playerDraw = playerTurn + playDirection;
            if (playerDraw === numPlayers) {
                playerDraw = 0;
            } else if (playerDraw < 0) {
                playerDraw = numPlayers - 1;
            }
            players[playerDraw] = players[playerDraw].concat(drawCards(4));
        }
        console.log("");

    } else {
        console.log("You can't play. You have to draw a card.");
        players[playerTurn].push(...drawCards(1));
    }

    ////////////////////////////

    playerTurn += playDirection;
    if (playerTurn >= numPlayers) {
        playerTurn = 0;
    } else if (playerTurn < 0) {
        playerTurn = numPlayers - 1;
    }
    //console.log("Game Over");
    //console.log(`${winner} is the Winner!`);

}



// let winner;

