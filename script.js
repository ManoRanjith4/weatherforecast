const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

// Your OpenWeatherMap API key
const apiKey = "YOUR_API_KEY";  // Replace with your actual API key

// Event listener for button click
getWeatherBtn.addEventListener("click", getWeather);

async function getWeather() {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Please try again.");
      return;
    }

    displayWeather(data);
  } catch (error) {
    alert("Error fetching weather data. Please try again.");
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = `https://openweathermap.org/img/w/${weather[0].icon}.png`;

  // Display weather information
  weatherInfo.style.display = "block";
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <img src="${icon}" alt="${description}" />
    <p class="temp">${temperature}°C</p>
    <p class="description">${description}</p>
  `;
}
