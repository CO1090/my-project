// function searchCity(location) {
//   console.log(location.data);
// }
// let apiKey = "7901bdaf7a02d4bcod183etbf6319a10";
// let units = "metric";
// let WeatherUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=${units}`;

// axios.get(WeatherUrl).then(searchCity);

// add date and time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let currentDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${currentDate}, ${hours}:${minutes}`;
}

// weather API change city and forecast

function showWeatherForecast(forecast) {
  let cityTemp = Math.round(forecast.data.temperature.current);
  document.querySelector("#temperature").innerHTML = cityTemp;
  document.querySelector("#city").innerHTML = forecast.data.city;
  document.querySelector("#weather-description").innerHTML =
    forecast.data.condition.description;
  document.querySelector("#local-time").innerHTML = formatDate(
    forecast.data.time * 1000
  );
  document.querySelector("#humidity").innerHTML =
    forecast.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    forecast.data.wind.speed
  );

  document
    .querySelector("#icon")
    .setAttribute("src", `${forecast.data.condition.icon_url}`);
  document
    .querySelector("#icon")
    .setAttribute("alt", forecast.data.condition.icon);

  celsiusTemp = cityTemp;
}

function searchCity(location) {
  let apiKey = "7901bdaf7a02d4bcod183etbf6319a10";
  let units = "metric";
  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${location}&key=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(showWeatherForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let location = document.querySelector("#city-input").value;
  searchCity(location);
}

function searchLocation(position) {
  let lat = position.coordinates.latitude;
  let lon = position.coordinates.longitude;
  let apiKey = "7901bdaf7a02d4bcod183etbf6319a10";
  let units = "metric";
  let weatherUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(showWeatherForecast);
}

let searchForm = document.querySelector("#city-form");
let searchBtn = document.querySelector("#city-form-btn");
searchForm.addEventListener("submit", handleSubmit);
searchBtn.addEventListener("click", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", showCurrentLocation);

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// change temperature unit

function changeUnitF(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function changeUnitC(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemp;
}

let celsius = document.querySelector("#unit-celsius");
let fahrenheit = document.querySelector("#unit-fahrenheit");

celsius.addEventListener("click", changeUnitC);
fahrenheit.addEventListener("click", changeUnitF);

let celsiusTemp = null;

searchCity("London");
