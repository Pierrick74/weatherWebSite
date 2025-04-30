import { getweatherData } from "./APIScript.js";

let datas = [{
    title: "Weather in Annecy",
    temperature: 22,
    imageUrl: "https://openweathermap.org/img/wn/11d@2x.png",
}]

// create a fonction to create data with list of city
const cityList = [
    {"lat":"45,899930",
     "lon": "6,12874",
    }];

async function refreshData() {
    cityList.forEach(async (city) => {
        const cityData = await getweatherData(city);
        console.log("recupere data");
        console.log(cityData);
        datas.push({
            title: cityData.name,
            temperature: cityData.main.temp,
            imageUrl: `https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
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