let date = new Date();

let currentInfo = document.querySelector(".currentTime");

let currentHours = date.getHours();
let currentMinutes = date.getMinutes().toString().padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];

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
let currentMonth = months[date.getMonth()];
let currentYear = date.getFullYear();
let currentDate = date.getDate();

currentInfo.innerHTML = `${currentHours}:${currentMinutes}<br/>
${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}`;

//Search
function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#current").innerHTML =
    response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "264dc05ae3aed84585d9a41f6a970fb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", search);

//Current Location
function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "264dc05ae3aed84585d9a41f6a970fb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
