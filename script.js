function getWeatherData(data) {
    const address = data.resolvedAddress;
    const currentConditions = data.currentConditions.conditions;
    const currentTemp = data.currentConditions.temp;
    const description = data.description;

    return {
        address,
        currentConditions,
        currentTemp,
        description
    }
}

async function getWeather() {
    try {
        const location = document.querySelector("input").value.toLowerCase();
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=NBNZUSXSF8YQXJSG2ZQ5BWV7J`;
        const response = await fetch(url, { mode: 'cors' });
        const data = await response.json();
        const weatherData = getWeatherData(data);
        const weatherInfo = `
            <h2>${weatherData.address}</h2>
            <p>Current Conditions: ${weatherData.currentConditions}</p>
            <p>Current Temperature: ${weatherData.currentTemp}°C</p>
            <p>Description: ${weatherData.description}</p>
        `;
        document.querySelector(".weather-info").innerHTML = weatherInfo;
        document.querySelector("input").value = "";
    } catch (error) {
        alert("Please enter a valid location.");
    }
}

const button = document.querySelector("button");
button.addEventListener("click", getWeather);