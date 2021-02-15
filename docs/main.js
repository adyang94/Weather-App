/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/* eslint-disable no-use-before-define */
// CONST AND VARIABLES--------------------------------------------
let long;
let lat;
let currentTemp;
let currentDescription;
let currentTimezone;
let currentIcon;
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const searchLocation = document.querySelector('#searchLocation');
const submitBtn = document.querySelector('#submitBtn');
// FUNCTIONS------------------------------------------------------
function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: 'white' });
  // MATCHING API ICON NAMES WITH SKYCONS
  if (icon === 'Clear') {
    icon = 'clear_day';
  } else if (icon === 'Clouds') {
    icon = 'cloudy';
  }
  const currentSkycon = icon.replace(/ /g, '_').toUpperCase();
  console.log(currentSkycon);
  skycons.play();
  // eslint-disable-next-line no-undef
  return skycons.set(iconID, Skycons[currentSkycon]);
}
function getCoordinates(resolve, reject) {
  // three parameters for getCurrentPosition.  First one is success parameter.
  if (navigator.geolocation) {
    console.log('1');
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log({ long });
      console.log({ lat });
      resolve('success');
    });
  } else if (!navigator.geolocation) {
    reject(Error);
  }
}

async function fetchWeatherByCoordinates() {
  // GET COORDINATES
  const promise = new Promise((resolve, reject) => {
    getCoordinates(resolve, reject);
  });

  await promise.then(() => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=7250132cebfb608efae470e5b346fac0`;
    // THIS MAY BE NEEDED FOR HOURLY OR FORECASTED WEATHER IF NEEDED. const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=7250132cebfb608efae470e5b346fac0`;

    fetch(api, { mode: 'cors' })
      .then((response) => response.json()) // unpackage JSON API file
      .then((data) => {
        console.log(data); // to check format of data being returned.

        currentTemp = (data.main.temp - 273) * (9 / 5) + 32;
        temperatureDegree.innerHTML = Math.floor(currentTemp);

        currentDescription = data.weather[0].description;
        temperatureDescription.innerHTML = currentDescription;

        currentTimezone = data.name;
        locationTimezone.innerHTML = `${currentTimezone}`;

        currentIcon = data.weather[0].main;
        setIcons(currentIcon, document.querySelector('.icon'));
      });
  })
    .catch((message) => {
      setTimeout(() => console.log(message), 1000);
    });
}
function fetchWeatherByLocation() {

}
// SCRIPT---------------------------------------------------------
window.onload = () => {
  fetchWeatherByCoordinates();
};

// SET ICON

/******/ })()
;
//# sourceMappingURL=main.js.map