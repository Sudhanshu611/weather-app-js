const API_KEY = '';
const URL = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${API_KEY}&units=metric`;


async function weatherAccessRequest(cityName){
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);

    const weatherData = await weatherResponse.json();
    return weatherData;
}

function renderCard(env, temp, cityName, windSpeed, humidity){

    document.querySelector('.weather-img').innerHTML = `<img src="images/${env}.png" alt="">`;
    document.querySelector('.temp').innerHTML = `${temp}°C`;
    document.querySelector('.country-name').innerHTML = `${cityName}`;
    document.querySelector('.other-units').innerHTML = `<div class="humidity">
                <img src="images/humidity.png" alt="">
                <div class="humidity-data">${humidity}%</div>
            </div>
            <div class="wind-speed">
                <img src="images/wind.png" alt="">
                <div class="wind-speed-data">${windSpeed}m/s</div>
            </div>`

}


function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function loadWeather(cityName){
    const weatherResponse = await weatherAccessRequest(cityName);
    const temp = weatherResponse['main']['temp'];
    const windSpeed = weatherResponse['wind']['speed'];
    const humidity = weatherResponse['main']['humidity'];
    const name = toTitleCase(cityName);
    const weatherImg = weatherResponse['weather'][0]['main'];
    const env = weatherImg.toLowerCase();
    console.log(weatherImg);
    renderCard(env, temp, name, windSpeed, humidity);
}

document.querySelector('.search-btn').addEventListener('click', async () => {
    const cityName = document.querySelector('.search-input').value;
    if (cityName) loadWeather(cityName);
});

window.addEventListener('load', async () => {
    loadWeather('india');
});