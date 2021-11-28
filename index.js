function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let displayTemp = document.querySelector("#display-temp");
  displayTemp.innerHTML = `${temperature}°F`;
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = `${city}`;
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  console.log(city.value);
  //let display = document.querySelector("#display-city");
  //display.innerHTML = city.value;

  let apiKey = "ae55b2734c25897ad68408d12d0a5fb9";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(`The latitude is ${latitude} and the longitude is ${longitude}`);
  let apiKey = "ae55b2734c25897ad68408d12d0a5fb9";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
}

function formatDate(todaysDate) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formatDay = days[todaysDate.getDay()];
  let formatMonth = months[todaysDate.getMonth()];
  let formatDate = todaysDate.getDate();
  let formatHour = todaysDate.getHours();
  let formatMinutes = todaysDate.getMinutes();

  if (formatMinutes < 10) {
    formatMinutes = `0${formatMinutes}`;
  }
  return `${formatDay}, ${formatMonth} ${formatDate}<br/>${formatHour}:${formatMinutes}`;
}

let heading = document.querySelector("#display-date");
heading.innerHTML = formatDate(new Date());

let changeCityForm = document.querySelector("#search-form");
changeCityForm.addEventListener("submit", handleSearch);

let currentLocationButton = document.querySelector("#current-weather");
currentLocationButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(handlePosition)
);
