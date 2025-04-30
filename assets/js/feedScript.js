import { getweatherData } from "./APIScript.js";

let datas = [];

// create a fonction to create data with list of city
const cityList = [
    {"lat":"45,899930",
        "lon": "6,12874",
    },
    {"lat":"45,78844",
        "lon": "6,09840",
    },
    {"lat":"45,94261",
        "lon": "6,42611",
    },
    {"lat":"45,90289",
        "lon": "6,42386",
    }
];

async function refreshData() {
    for (const city of cityList) {
        try {
            const cityData = await getweatherData(city); // Attendre les données pour chaque ville
            console.log("recupere data");
            console.log(cityData);
            datas.push({
                title: cityData.name,
                temperature: cityData.main.temp,
                imageUrl: `https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération des données pour ${city}:`, error);
        }
    }
    console.log(datas);
}

// create a function to create card elements
function createCardElement(title, temperature, imageUrl) {
    
    const card = document.createElement("div");
    card.classList.add("card");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContent");
    
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = title;
    
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = title;
    
    const cardTemperature = document.createElement("p");
    cardTemperature.textContent = temperature + "°C";
    
    cardContainer.appendChild(cardTitle);
    cardContainer.appendChild(cardTemperature);
    
    card.appendChild(img);
    card.appendChild(cardContainer);
    return card;
}

// create a function to display the data
function displayData(datas) {
    const cardContainer = document.getElementById("Feed");

    resetData();

    datas.forEach((data) => {
        console.log("affiche card");
        console.log(data);
        const card = createCardElement(data.title, data.temperature, data.imageUrl);
        cardContainer.appendChild(card);
    });
}

async function displayInfo() {
    await refreshData();
    displayData(datas);
}

function resetData() {
    const cardContainer = document.getElementById("Feed");
    cardContainer.innerHTML = '';
    datas = [];
}

displayInfo();

document.getElementById("submit").addEventListener("click", displayInfo);

