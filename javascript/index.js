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

function formatHour(hour) {
  let hours = new Date(hour * 1000).getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}`;
}

function formatDay(day) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let fDay = days[new Date(day * 1000).getDay()];

  return `${fDay}`;
}

// weather API change city and forecast

function displayDayForecast(response) {
  let forecastDay = response.data.daily;
  for (let i = 0; i < 5; i++) {
    let forecastDate = formatDay(forecastDay[i].dt);
    let icon = forecastDay[i].weather[0].icon;
    let maxTemp = Math.round(forecastDay[i].temp.max);
    let minTemp = Math.round(forecastDay[i].temp.min);

    document.getElementById(`day-${i}`).textContent = forecastDate;
    document.getElementById(`day-${0}`).textContent = "Today";
    document.getElementById(
      `icon-${i}`
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById(`max-temp-${i}`).textContent = maxTemp;
    document.getElementById(`min-temp-${i}`).textContent = minTemp;
  }
}

function displayHourForecast(response) {
  let forecastHourly = response.data.hourly;
  let forecastElement = document.querySelector("#hour-forecast");

  let forecastHTML = `<div class="row bottom">`;
  forecastHourly.forEach(function (forecastHour, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
                <p>
                  ${formatHour(forecastHour.dt)} <br />
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastHour.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="30"
                  /><br />
                  <strong>${Math.round(forecastHour.temp)}°</strong>
                </p>
              </div>
              
  `;
    }

    if (index === 0) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
                <p>
                  Now <br />
                  <img
                    src="https://openweathermap.org/img/wn/${
                      forecastHour.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="30"
                  /><br />
                  <strong>${Math.round(forecastHour.temp)}°</strong>
                </p>
              </div>
              
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayHourForecast);
  axios.get(apiUrl).then(displayDayForecast);
}

function showWeatherForecast(forecast) {
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

  getForecast(forecast.data.coord);
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

searchCity("London");
