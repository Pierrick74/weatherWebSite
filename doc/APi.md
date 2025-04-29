# Documentation de l'API weatherstack

## Call 

- Point de terminaison API: 

http://api.weatherstack.com/current

- access_key 
utilisation d'un plan gratuit
    - Limitation: utilisation de la météo current
    - Pas de possibilité d'utiliser les Units Parameter
    - Pas de possibilité de mettre plusieurs villes dans le Query

- Query
    Plusieurs types de query possible
    - nom: Annecy
    - position: 40.7831,-73.9712

## Response
### valide
{
    "request": {
        "type": "City",
        "query": "New York, United States of America",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "New York",
        "country": "United States of America",
        "region": "New York",
        "lat": "40.714",
        "lon": "-74.006",
        "timezone_id": "America/New_York",
        "localtime": "2019-09-07 08:14",
        "localtime_epoch": 1567844040,
        "utc_offset": "-4.0"
    },
    "current": {
        "observation_time": "12:14 PM",
        "temperature": 13,
        "weather_code": 113,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        ],
        "weather_descriptions": [
            "Sunny"
        ],
        "astro": {
            "sunrise": "06:31 AM",
            "sunset": "05:47 PM",
            "moonrise": "06:56 AM",
            "moonset": "06:47 PM",
            "moon_phase": "Waxing Crescent",
            "moon_illumination": 0
        },
        "air_quality": {
            "co": "468.05",
            "no2": "32.005",
            "o3": "55",
            "so2": "7.4",
            "pm2_5": "6.66",
            "pm10": "6.66",
            "us-epa-index": "1",
            "gb-defra-index": "1"
        },
        "wind_speed": 0,
        "wind_degree": 349,
        "wind_dir": "N",
        "pressure": 1010,
        "precip": 0,
        "humidity": 90,
        "cloudcover": 0,
        "feelslike": 13,
        "uv_index": 4,
        "visibility": 16
    }
}

### invalide 
- nom de ville non présent

    - 601 	An invalid (or missing) query value was specified.
    - 604   ulk_queries_not_supported_on_plan
    - 404   User requested a resource which does not exist.
    - 429   too_many_requests


## Exemple
```javascript
const url = "https://api.weatherstack.com/current?access_key={PASTE_YOUR_API_KEY_HERE}&query=Annecy";
const options = {
    method: "GET",
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}
```