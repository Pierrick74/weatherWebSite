import { getweatherData, getCityCoordinate } from "./APIScript.js";

let datas = [];
let isSelectionActive = false;

// create a fonction to create data with list of city
let cityList = [
    {"lat":"45,899930",
        "lon": "6,12874",
        "new": false,
        "name": "AnnecyTest",
    },
    {"lat":"45,78844",
        "lon": "6,09840",
        "new": false,
        "name": "City2",
    },
    {"lat":"45,94261",
        "lon": "6,42611",
        "new": false,
        "name": "City3",
    },
    {"lat":"45,90289",
        "lon": "6,42386",
        "new": false,
        "name": "City4",
    }
];

async function refreshData() {
    for (const city of cityList) {
        try {
            const cityData = await getweatherData(city); // Attendre les données pour chaque ville
            datas.push({
                title: cityData.name,
                temperature: cityData.main.temp,
                imageUrl: `https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
                new: city.new,
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération des données pour ${city}:`, error);
        }
    }
}

// create a function to create card elements
function createCardElement(title, temperature, imageUrl, newCity) {
    
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

    const cardSelection = document.createElement("input");
    cardSelection.type = "checkbox"
    cardSelection.id = title
    
    cardContainer.appendChild(cardTitle);
    cardContainer.appendChild(cardTemperature);
    
    card.appendChild(img);
    card.appendChild(cardContainer);
    if(newCity && isSelectionActive) {
        card.appendChild(cardSelection);
    }
    return card;
}

// create a function to display the data
function displayData(datas) {
    const cardContainer = document.getElementById("Feed");

    resetData();

    datas.forEach((data) => {
        const card = createCardElement(data.title, data.temperature, data.imageUrl, data.new);
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

//-------------input ------------------------
document.getElementById("send-city").addEventListener("click", addCity);

async function addCity() {
    const input = document.getElementById("name").value;
    
    try {
        let city = await getCityCoordinate(input)
        cityList.push(
            {"lat":city.lat,
            "lon": city.lon,
            "new": true,
            "name": input,
        });
        displayInfo();

    } catch (error) {
        console.error(`Erreur lors de la récupération des données pour ${input}:`, error);
    }
}

//-------------selection elements ----------------
document.getElementById("selection").addEventListener("click", toggleIsSelection);

function toggleIsSelection() {
    if(isSelectionActive) {
        isSelectionActive = false;
        document.getElementById("selection").textContent = "Selection";
        deleteSelectedCity() ;
    } else {
        isSelectionActive = true;
        document.getElementById("selection").textContent = "Effacer la selection";
    }
    displayInfo();
}

function deleteSelectedCity() {
    let newCityList = [];
    const selectedCities = document.querySelectorAll('input[type="checkbox"]:checked');
    selectedCities.forEach((city) => {
        const cityName = city.id;
        newCityList = cityList.filter((city) => city.name !== cityName);
    });
    cityList = newCityList;
}   
