const getWeatherBtn = document.getElementById('get-weather-btn');
const citySelect = document.getElementById('city-select');

getWeatherBtn.addEventListener('click', () => {
    const city = citySelect.value;
    if (city === ""){
        return;
    }

    showWeather(city);
});

async function getWeather(city) {
    try {
        const api = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        const data = await api.json();
        return data;
    }
    catch (error) {
        console.error('Something went wrong, please try again later');
        return null;
    }
}

async function showWeather(city) {
    // 1. Wait for getWeather to do its job and return the data
    const weatherData = await getWeather(city);

    // 2. Check for errors. If getWeather returned null, show the alert.
    if (!weatherData) {
        alert("Something went wrong, please try again later.");
        return; // Stop the function here
    }

    // 3. If we have data, we move on to updating the HTML elements...
    updateUI(weatherData); 
}

function updateUI(data) {
    // Location
    document.getElementById('location').textContent = data.name ?? 'N/A';

    // Weather Array (The API puts the main condition and icon inside an array)
    // We check if data.weather exists and has at least one item
    if (data.weather && data.weather.length > 0) {
        const weatherInfo = data.weather[0];
        
        // Update Icon
        const iconElement = document.getElementById('weather-icon');
        iconElement.src = weatherInfo.icon;
        iconElement.style.display = 'block'; // Unhide the image now that it has a source
        
        // Update Main Weather Type
        document.getElementById('weather-main').textContent = weatherInfo.main ?? 'N/A';
    }

    // Temperature (Located inside data.main)
    document.getElementById('main-temperature').textContent = data.main?.temp ?? 'N/A';
    document.getElementById('feels-like').textContent = data.main?.feels_like ?? 'N/A';
    document.getElementById('humidity').textContent = data.main?.humidity ?? 'N/A';

    // Wind (Located inside data.wind)
    document.getElementById('wind').textContent = data.wind?.speed ?? 'N/A';
    document.getElementById('wind-gust').textContent = data.wind?.gust ?? 'N/A';
}

