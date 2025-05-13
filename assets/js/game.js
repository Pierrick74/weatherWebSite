import { getGameData} from "./APIScript.js";

let gameData = [];
let turnNumber = 0;
let isGameStarted = false;
let cardDatas = [];
let currentFlippedIndex = [];
let menuDifficultySelection = 1;

const gameContainer = document.getElementById("information");

async function startGame() {
    try {
        await getGameDatas();
        createHeaderGame();
        createGameDatas();
        
    } catch (error) {
        console.error("Error displaying game information:", error);
    }
}

function showInfo() {
    gameContainer.innerHTML = "";
    
    createTitle();

    const gameDificulty = createDifficultyMenu();
    gameContainer.appendChild(gameDificulty);

    const gameTurn = document.createElement("div");
    gameTurn.id = "headerGame"
    gameContainer.appendChild(gameTurn);
    createHeaderGame();
}

function createHeaderGame() {

    const gameTurn = document.getElementById("headerGame");
    gameTurn.innerHTML = "";
    const gameTurnButton = createGameButton();
    gameTurn.appendChild(gameTurnButton);

    if (isGameStarted) {
        const gameTurnValue = document.createElement("p");
        gameTurnValue.textContent = "Nombre de tours : " + turnNumber;
        gameTurn.appendChild(gameTurnValue);
    }
}

function createTitle() {
    const gameName = document.createElement("div");
    const gameTitle = document.createElement("h3");
    gameTitle.textContent = gameData.title;
    
    const gameDescription = document.createElement("p");
    gameDescription.textContent = gameData.description;
    
    gameName.appendChild(gameTitle);
    gameName.appendChild(gameDescription);
    gameContainer.appendChild(gameName);
}

//---------------call api----------------
async function getGameDatas() {
    try {
        gameData = await getGameData(menuDifficultySelection);
    } catch (error) {
        console.error("Error fetching game data:", error);
    }
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
    } else {
        isGameStarted = true;
    }
    turnNumber = 0;
    startGame();
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
    console.log(cardDatas);
}

function createCardElements(index) {
    let imageIndex = (index >= gameData.img.length) ? index - gameData.pairs : index;
    
    return {
        id: index,
        imageUrl: gameData.img[imageIndex],
        isFlipped: false,
        isFind: false,
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
        if(cardData.isFind){
            img.classList.add("done");
        } else {
            img.addEventListener("click", () => {
                flippedCard(cardData.id)
            });
        }

        gameContainer.appendChild(img);
    });
}

function flippedCard(index) {
    currentFlippedIndex.push(index);
    console.log(currentFlippedIndex);
    
    const card = cardDatas.find(card => card.id === index);
    if (card) {
        card.isFlipped = true;
    }
    
    switch(currentFlippedIndex.length) {
        case 1:
        createCards(cardDatas);
        break;
        case 2:
        createCards(cardDatas);
        setTimeout(checkRules, 700);
        break;
    }
}

function checkRules() {
    currentFlippedIndex.sort((a, b) => a - b);
    console.log(currentFlippedIndex);
    console.log(gameData);
    if(currentFlippedIndex[0] + (gameData.pairs) === currentFlippedIndex[1]) {
        console.log("well done");
        cardDatas.find(card => card.id === currentFlippedIndex[0]).isFind = true;

        cardDatas.find(card => card.id === currentFlippedIndex[1]).isFind = true;
   
        incrementTurn();
    } else {
        console.log("looser")
        toggleFlippedCardAtIndex(currentFlippedIndex[0]);
        toggleFlippedCardAtIndex(currentFlippedIndex[1]);
        incrementTurn();
    }
    createCards(cardDatas);
}

function incrementTurn(){
    currentFlippedIndex = [];
    turnNumber++;
    createHeaderGame();
}

function toggleFlippedCardAtIndex(index) {
    const card = cardDatas.find(card => card.id === index);
    if (card) {
        card.isFlipped = !card.isFlipped;
    }
}


//------------------------start----------------------
async function startPage() {
  
    if(gameData.length === 0) {
      await getGameDatas()
    } 
    showInfo();
}

startPage();

//---------------difficulty----------------
function createDifficultyMenu(){
    const menu = document.createElement("div");
    menu.id = "difficultyMenu"
    for (let i = 1; i < 4; i++) {
        const element = createDifficultyBoutton(i);
        element.addEventListener("click", () => setDifficulty(i));
        element.id = i;
        menu.appendChild(element);
    }

    return menu
}

function showMenu() {
    for (let i = 1; i < 4; i++) {
        if (document.getElementById(i).classList.contains("hidden")) {
            document.getElementById(i).classList.remove("hidden");
        }
    }
}

function setDifficulty(index){
    if(isMenuIsHidden()){
        console.log("ici");
        showMenu();
    } else {
        menuDifficultySelection = index;
        console.log("else");
        showOnlyMenuIndex(index)
    }
}

function showOnlyMenuIndex(index){
    for (let i = 1; i < 4; i++) {
        
        if (i !== menuDifficultySelection) {
            document.getElementById(i).classList.add("hidden");
        }
    }
}

function isMenuIsHidden() {
    for (let i = 1; i < 4; i++) {
        if(document.getElementById(i).classList.contains("hidden")){
            return true;
        }
    }
    return false;
}

function createDifficultyBoutton(difficulty) {
    const gameDificulty = document.createElement("bouton");
    gameDificulty.classList.add("gameDifficulty");
    gameDificulty.textContent = "difficulté ";

    gameDificulty.appendChild(createElementWithStars(difficulty));
    return gameDificulty;
}


function createElementWithStars(index) {
    const stars = document.createElement("div")
    for (let i = 0; i < index; i++) {
        const img = document.createElement("img");
        img.src = "assets/img/difficulty/stars-fill.jpeg";
        img.alt = "star";
        img.classList.add("difficultyStar");
        stars.appendChild(img);
    }
    for (let i = index; i < 3; i++) {
        const img = document.createElement("img");
        img.src = "assets/img/difficulty/stars.png";
        img.alt = "star";
        img.classList.add("difficultyStar");
        stars.appendChild(img);
    }
    return stars
}