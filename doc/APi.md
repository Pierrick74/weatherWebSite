# Documentation de l'API openweathermap

## Call 

- Point de terminaison API: 

https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

- appid
utilisation d'un plan gratuit
    - Limitation: utilisation 1000 call par jour
    - 

- Query
    lat long de la position
    lang    langue fr
    unit    

## Response
### valide
{
  "coord": {
    "lon": 6.1287,
    "lat": 45.8999
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "ciel dégagé",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 289.23,
    "feels_like": 288.64,
    "temp_min": 289.23,
    "temp_max": 289.23,
    "pressure": 1023,
    "humidity": 67,
    "sea_level": 1023,
    "grnd_level": 935
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.03,
    "deg": 0
  },
  "clouds": {
    "all": 0
  },
  "dt": 1745997373,
  "sys": {
    "type": 1,
    "id": 6500,
    "country": "FR",
    "sunrise": 1745987043,
    "sunset": 1746038468
  },
  "timezone": 7200,
  "id": 3037543,
  "name": "Annecy",
  "cod": 200
}

### invalide 
- nom de ville non présent

    - 400   probleme dans la demande
    - 401   probleme d'acces API
    - 404   la position n'est pas correcte
    - 429   trop de demande 




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

# geocoding
## Call

-body
    http://api.openweathermap.org/geo/1.0/direct?

- query
    q = {city name},{state code},{country code}
    limite = nombre de retour
    appid

## response
### valide
[
  {
    "name": "Annecy",
    "local_names": {
      "ar": "آنسي",
      "fr": "Annecy",
      "el": "Ανεσύ",
      "eo": "Anecio",
      "ru": "Анси"
    },
    "lat": 45.8992348,
    "lon": 6.1288847,
    "country": "FR",
    "state": "Auvergne-Rhône-Alpes"
  }
]

### invalide
