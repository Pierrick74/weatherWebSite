import { getGameData} from "./APIScript.js";

let gameData = [];
let turnNumber = 0;
let isGameStarted = false;
let cardDatas = [];

async function displayGameInformation() {
    try {
        await getGameDatas();
        showInfo();
        createGameDatas();
        
    } catch (error) {
        console.error("Error displaying game information:", error);
    }
}


    displayGameInformation();


function showInfo() {
    const gameContainer = document.getElementById("information");
    gameContainer.innerHTML = ""; // Clear previous content
    
    console.log("Game data:", gameData);
    const gameName = document.createElement("div");
    const gameTitle = document.createElement("h3");
    gameTitle.textContent = gameData.title;
    
    const gameDescription = document.createElement("p");
    gameDescription.textContent = gameData.description;
    
    gameName.appendChild(gameTitle);
    gameName.appendChild(gameDescription);


    const gameDificulty = setDifficulty(gameData.dificulty);

    const gameTurn = document.createElement("p");
    const gameTurnButton = createGameButton();
    gameTurn.appendChild(gameTurnButton);

    if (isGameStarted) {
        const gameTurnValue = document.createElement("p");
        gameTurnValue.textContent = "Nombre de tours : " + turnNumber;
        gameTurn.appendChild(gameTurnValue);
    }

    gameContainer.appendChild(gameName);
    gameContainer.appendChild(gameDificulty);
    gameContainer.appendChild(gameTurn);
}

//---------------call api----------------
async function getGameDatas() {
    try {
        gameData = await getGameData();
    } catch (error) {
        console.error("Error fetching game data:", error);
    }
}

//---------------difficulty----------------
function setDifficulty(difficulty) {
    const gameDificulty = document.createElement("p");
    gameDificulty.classList.add("gameDifficulty");
    gameDificulty.textContent = "difficulté ";
    
    const gameDifficultyValue = document.createElement("div");
    for (let i = 0; i < difficulty; i++) {
        const img = document.createElement("img");
        img.src = "assets/img/difficulty/stars-fill.jpeg";
        img.alt = "star";
        img.classList.add("difficultyStar");
        gameDifficultyValue.appendChild(img);
    }
    for (let i = difficulty; i < 3; i++) {
        const img = document.createElement("img");
        img.src = "assets/img/difficulty/stars.png";
        img.alt = "star";
        img.classList.add("difficultyStar");
        gameDifficultyValue.appendChild(img);
    }
    
    gameDificulty.appendChild(gameDifficultyValue);
    return gameDificulty;
}

function createGameButton () {
    const gameTurnButton = document.createElement("button");
    gameTurnButton.textContent = isGameStarted ? "Recommencer" : "Commencer";
    gameTurnButton.classList.add("gameTurnButton");
    gameTurnButton.addEventListener("click", gameManager);
    return gameTurnButton;
}

function gameManager() {
    if (isGameStarted) {
        turnNumber = 0;
    } else {
        isGameStarted = true;
    }
    displayGameInformation();
}

//---------------card----------------
function createGameDatas() {
    const gameContainer = document.getElementById("game");
    gameContainer.innerHTML = ""; // Clear previous content
    cardDatas = [];
    for (let i = 0; i < gameData.pairs; i++) {
        cardDatas.push({ ...createCardElements(i) });
        cardDatas.push({ ...createCardElements(i+gameData.pairs) });
    }
    shuffleCards(cardDatas);
    createCards(cardDatas);
}

function createCardElements(index) {
    if (index >= gameData.img.length) {
        index = index - gameData.pairs;
    }
    return {
        id: index,
        imageUrl: gameData.img[index],
        isFlipped: false,
    };
}

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
}

function createCards(cardDatas) {
    const gameContainer = document.getElementById("game");
    gameContainer.innerHTML = ""; // Clear previous content
    cardDatas.forEach((cardData) => {
        const img = document.createElement("img");
        img.src = cardData.isFlipped ? cardData.imageUrl : "assets/img/hidden.jpg";
        img.alt = "card image";
        img.id = cardData.id;
        img.classList.add("card");
        img.addEventListener("click", () => {
            cardData.isFlipped = true;
            turnNumber++;
            createCards(cardDatas);
        });
        gameContainer.appendChild(img);
    });
}


