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

function displayHourForecast(response) {
  console.log(response.data.hourly);
  let forecastElement = document.querySelector("#hour-forecast");
  let forecastHours = ["Now", "21", "22", "23", "00", "01"];

  let forecastHTML = `<div class="row bottom">`;
  forecastHours.forEach(function (hour) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
                <p>
                  ${hour} <br />
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                    alt=""
                    width="30"
                  /><br />
                  <strong>9°C</strong>
                </p>
              </div>
              
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getHourlyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayHourForecast);
}

function showWeatherForecast(forecast) {
  console.log(forecast.data);
  let cityTemp = Math.round(forecast.data.main.temp);
  document.querySelector("#temperature").innerHTML = cityTemp;
  document.querySelector("#h-temp").innerHTML = Math.round(
    forecast.data.main.feels_like
  );
  document.querySelector("#city").innerHTML = forecast.data.name;
  document.querySelector("#weather-description").innerHTML =
    forecast.data.weather[0].description;
  document.querySelector("#local-time").innerHTML = formatDate(
    forecast.data.dt * 1000
  );
  document.querySelector("#humidity").innerHTML = forecast.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    forecast.data.wind.speed
  );

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${forecast.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", forecast.data.weather[0].description);

  celsiusTemp = cityTemp;
  hTemp = Math.round(forecast.data.main.feels_like);

  getHourlyForecast(forecast.data.coord);
}

function searchCity(location) {
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
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
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
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

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// change temperature unit

function changeUnitF(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let fahrenheitHTemp = (hTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);

  document.querySelector("#h-temp").innerHTML = Math.round(fahrenheitHTemp);
  document.querySelector("#h-unit").innerHTML = "°F";
}

function changeUnitC(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemp;

  document.querySelector("#h-temp").innerHTML = hTemp;

  document.querySelector("#h-unit").innerHTML = "°C";
}

let celsius = document.querySelector("#unit-celsius");
let fahrenheit = document.querySelector("#unit-fahrenheit");

celsius.addEventListener("click", changeUnitC);
fahrenheit.addEventListener("click", changeUnitF);

let celsiusTemp = null;
let hTemp = null;

searchCity("London");
