/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// CONST AND VARIABLES--------------------------------------------
let long;
let lat;
let currentTemp;
let currentDescription;
let currentTimezone;
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
// FUNCTIONS------------------------------------------------------
// SCRIPT---------------------------------------------------------
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(`Coordinates:  ${lat}, ${long}`);

      // const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7250132cebfb608efae470e5b346fac0`;
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=7250132cebfb608efae470e5b346fac0`;

      console.log(`API: ${api}`);

      fetch(api, { mode: 'cors' })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          currentTemp = data.current.temp - 273;
          temperatureDegree.innerHTML = Math.floor(currentTemp);

          currentDescription = data.current.weather[0].main;
          temperatureDescription.innerHTML = currentDescription;

          currentTimezone = data.timezone;
          locationTimezone.innerHTML = `Timezone: ${currentTimezone}`;
        });
    });
  }
};

/******/ })()
;
//# sourceMappingURL=main.js.map