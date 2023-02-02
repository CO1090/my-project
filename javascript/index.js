// define date and time
function getCurrentDateTime(date) {
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

// add date and time
let dateTime = document.querySelector("#local-time");
let currentDateTime = new Date();
dateTime.innerHTML = getCurrentDateTime(currentDateTime);

// weather API change city and forecast

function showWeatherForecast(forecast) {
  let cityTemp = Math.round(forecast.data.main.temp);
  document.querySelector("#temperature").innerHTML = cityTemp;
  document.querySelector("#city").innerHTML = forecast.data.name;
  document.querySelector("#weather-description").innerHTML =
    forecast.data.weather[0].main;
}

function searchCity(location) {
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let units = "metric";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(showWeatherForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let location = document.querySelector("#city-input").value;
  searchCity(location);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let units = "metric";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(showWeatherForecast);
}

let searchForm = document.querySelector("#city-form");
let searchBtn = document.querySelector("#city-form-btn");
searchForm.addEventListener("submit", handleSubmit);
searchBtn.addEventListener("click", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", showCurrentLocation);

searchCity("London");

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// change temperature unit

function changeUnitF(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  //temperature.innerHTML = "66";
}

function changeUnitC(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  //temperature.innerHTML = "15";
}

let celsius = document.querySelector("#unit-celsius");
let fahrenheit = document.querySelector("#unit-fahrenheit");

celsius.addEventListener("click", changeUnitC);
fahrenheit.addEventListener("click", changeUnitF);
