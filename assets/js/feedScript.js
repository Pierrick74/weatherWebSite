import { getweatherData } from "./APIScript.js";

let datas = [{
    title: "Weather in Annecy",
    temperature: 22,
    imageUrl: "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0016_thundery_showers.png",
}]

// create a fonction to create data with list of city
const cityList = ["semnoz", "poisy" ];

async function refreshData() {
    cityList.forEach(async (city) => {
        const cityData = await getweatherData(city);
        console.log("recupere data");
        console.log(cityData);
        datas.push({
            title: cityData.location.name,
            temperature: cityData.current.temperature,
            imageUrl: cityData.current.weather_icons[0],
        });
    });
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

displayInfo();

document.getElementById("submit").addEventListener("click", displayInfo);