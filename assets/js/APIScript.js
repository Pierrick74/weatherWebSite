
import jsonDatas from "./mockData.js";
console.log(jsonDatas);
// script For API
const isMockActivated = false;
let mockNumber = 0;

const options = {
    method: "GET",
};

function getMockData() {
    mockNumber += 1;
    if(mockNumber >= jsonDatas.length) {
        mockNumber = 0;
    }
    return jsonDatas[mockNumber];
}

async function fetchWeatherData(lat, lon) {

    const apiKey = "d1f41b4c764ff93e1f14198b41e24b44";
    const url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=fr&units=metric`;
console.log(url);
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("Weather API response:", result);
        return result;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

export async function getweatherData(city) {
    if (isMockActivated) {
        return getMockData();
    } else {
        return await fetchWeatherData(city.lat, city.lon);
    }
}

