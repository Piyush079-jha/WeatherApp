const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

// DOM Elements
const userTab = document.querySelector(".Your-weather");
const searchTab = document.querySelector(".search-weather");
const searchForm = document.querySelector(".searchForm");
const searchContainer = document.querySelector(".search-weather-container");
const userWeather = document.querySelector(".userWeather");
const grantLocation = document.querySelector(".grant-location-container");
const loaderScreen = document.querySelector(".loader");
const grantLocationBtn = document.querySelector(".grant-access-btn");
const searchInput = document.querySelector(".searchInput");

// Set default tab
let currentTab = userTab;
currentTab.classList.add("tab");

// Switch Tab Function
function switchTab(clickedTab) {
  if (clickedTab !== currentTab) {
    currentTab.classList.remove("tab");
    currentTab = clickedTab;
    currentTab.classList.add("tab");

    // Hide all sections
    grantLocation.classList.remove("visible");
    userWeather.classList.remove("visible");
    loaderScreen.classList.remove("visible");
    searchContainer.classList.remove("visible");

    if (currentTab === searchTab) {
      searchContainer.classList.add("visible");
    } else {
      getFromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => switchTab(userTab));
searchTab.addEventListener("click", () => switchTab(searchTab));

// Initial UI state
grantLocation.classList.add("visible");

// Event listener
grantLocationBtn.addEventListener("click", geoLocation);

// Location logic
function geoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, (err) => {
      alert("Location access denied or not available.");
    });
  } else {
    alert("Geolocation not supported by this browser.");
  }
}

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchWeatherByCoordinates(userCoordinates);
}

function getFromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    grantLocation.classList.add("visible");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchWeatherByCoordinates(coordinates);
  }
}

async function fetchWeatherByCoordinates(coordinates) {
  const { lat, lon } = coordinates;
  grantLocation.classList.remove("visible");
  loaderScreen.classList.add("visible");
  userWeather.classList.remove("visible");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch weather data.");
    loaderScreen.classList.remove("visible");
    userWeather.classList.add("visible");
    renderWeatherInfo(data);
  } catch (error) {
    loaderScreen.classList.remove("visible");
    console.error(error);
  }
}

async function fetchWeatherByCity(city) {
  loaderScreen.classList.add("visible");
  userWeather.classList.remove("visible");
  grantLocation.classList.remove("visible");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data.");
    const data = await response.json();
    loaderScreen.classList.remove("visible");
    userWeather.classList.add("visible");
    renderWeatherInfo(data);
  } catch (error) {
    loaderScreen.classList.remove("visible");
    console.error(error);
  }
}

function renderWeatherInfo(info) {
  document.querySelector(".user-city").innerText = info.name || "";
  document.querySelector(".country-icon").src = `https://flagcdn.com/144x108/${info.sys.country.toLowerCase()}.png`;
  document.querySelector(".weather-icon").src = `http://openweathermap.org/img/w/${info.weather[0].icon}.png`;
  document.querySelector(".user-weather-condition").innerText = info.weather[0].description || "";
  document.querySelector(".user-temp").innerText = `${info.main.temp} °C`;
  document.querySelector(".wind-speed").innerText = `${info.wind.speed} m/s`;
  document.querySelector(".humidity-value").innerText = `${info.main.humidity}%`;
  document.querySelector(".cloud-value").innerText = `${info.clouds.all}%`;
}

// Search form submit
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = searchInput.value.trim();
  if (cityName) {
    fetchWeatherByCity(cityName);
  }
});
