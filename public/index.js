
// const apiKey = API_KEY;
// const apiUrl = API_URL;

// const searchBox = document.querySelector('.search input');
// const searchBtn = document.querySelector('.search button');
// const weatherIcon = document.querySelector('.weather-icon');

// async function checkWeather(city) {
//     const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
//     var data = await response.json();
//     if(!data || data.cod === '404'){
//         document.querySelector('.city').innerHTML = data.message + '😞';
//         document.querySelector('.temp').innerHTML = "";
//         document.querySelector('.humidity').innerHTML = "";
//         document.querySelector('.wind').innerHTML = "";
//         weatherIcon.src = 'images/sad.png';
//     }else{
//         document.querySelector('.city').innerHTML = data.name;
//         document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
//         document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
//         document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
//         if(data.weather[0].main == 'Clouds'){
//             weatherIcon.src = 'images/clouds.png';
//         }
//         else if(data.weather[0].main == 'Clear'){
//             weatherIcon.src = 'images/clear.png';
//         }
//         else if(data.weather[0].main == 'Rain'){
//             weatherIcon.src = 'images/rain.png';
//         }
//         else if(data.weather[0].main == 'Drizzle'){
//             weatherIcon.src = 'images/drizzle.png';
//         }
//         else if(data.weather[0].main == 'Mist'){
//             weatherIcon.src = 'images/Mist.png';
//         }
//     }
// }
// searchBtn.addEventListener('click', ()=>{
//     checkWeather(searchBox.value);
// })


const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

let apiKey = "";
let apiUrl = "";

// Fetch API Key from Backend
async function loadConfig() {
    try {
        const response = await fetch("http://localhost:3000/config");
        const config = await response.json();
        apiKey = config.apiKey;
        apiUrl = config.apiUrl;
    } catch (error) {
        console.error("Error fetching API key:", error);
    }
}

async function checkWeather(city) {
    if (!apiKey || !apiUrl) {
        console.error("API key or URL is missing!");
        return;
    }
    
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    var data = await response.json();
    if (!data || data.cod === "404") {
        document.querySelector('.city').innerHTML = "City not found 😞";
        document.querySelector('.temp').innerHTML = "";
        document.querySelector('.humidity').innerHTML = "";
        document.querySelector('.wind').innerHTML = "";
        weatherIcon.src = 'images/sad.png';
    } else {
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        // Set weather icon
        const weatherCondition = data.weather[0].main;
        const weatherIcons = {
            "Clouds": "images/clouds.png",
            "Clear": "images/clear.png",
            "Rain": "images/rain.png",
            "Drizzle": "images/drizzle.png",
            "Mist": "images/mist.png",
            "Haze": "images/haze.png"
        };
        weatherIcon.src = weatherIcons[weatherCondition] || "images/default.png";
    }
}

// Load API key before using it
loadConfig();

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
