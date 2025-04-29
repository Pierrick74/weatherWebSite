
import jsonDatas from "./mockData.js";
console.log(jsonDatas);
// script For API
const isMockActivated = true;
const apiKey = "8a28645e8cf3a1703bd496df0d344610";
const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=Annecy`;

const options = {
    method: "GET",
};

function getMockData() {
    return jsonDatas;
}

async function fetchWeatherData() {
    try {
        const response = await fetch(url, options);
    const result = await response.json();
        console.log("Weather API response:", result);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function getweatherData() {
    if (isMockActivated) {
        return getMockData();
    } else {
        fetchWeatherData();
    }
}


getweatherData();

