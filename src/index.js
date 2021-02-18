/* eslint-disable no-constant-condition */
/* eslint-disable no-use-before-define */
// CONST AND VARIABLES--------------------------------------------
let long;
let lat;
let currentTemp;
let currentDescription;
let currentTimezone;
let currentCode;
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const searchBox = document.querySelector('#searchLocation');
const submitBtn = document.querySelector('#submitBtn');

// FUNCTIONS------------------------------------------------------
function setIcons(code, iconID) {
  // eslint-disable-next-line no-undef
  const skycons = new Skycons({ color: 'white' });
  // MATCHING API ICON NAMES WITH SKYCONS
  let icon;

  const clearCodes = [1000];
  const cloudyCodes = [1003, 1006, 1009];
  const rainCodes = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282];
  const snowCodes = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282];
  const fogCodes = [1147, 1030, 1135];
  const hailCodes = [1237, 1261, 1264];
  const sleetCodes = [1069, 1072, 1168, 1171, 1204, 1207, 1249, 1252];
  const thunderCodes = [1087];
  const thunderShowerNightCodes = [1273, 1276];

  if (clearCodes.includes(code)) {
    icon = 'clear_day';
  // } else if (code === 1003 , code === 1006 , code === 1009) {
  //   icon = 'cloudy';
  } else if (cloudyCodes.includes(code)) {
    icon = 'cloudy';
    console.log('hello');
  } else if (rainCodes.includes(code)) {
    icon = 'rain';
  } else if (snowCodes.includes(code)) {
    icon = 'snow';
  } else if (fogCodes.includes(code)) {
    icon = 'fog';
  } else if (hailCodes.includes(code)) {
    icon = 'hail';
  } else if (sleetCodes.includes(code)) {
    icon = 'sleet';
  } else if (thunderCodes.includes(code)) {
    icon = 'thunder';
  } else if (thunderShowerNightCodes.includes(code)) {
    icon = 'thunder-showers-night';
  }

  const currentSkycon = icon.replace(/ /g, '_').toUpperCase();
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
function submitLocation() {
  const searchLocation = searchBox.value;
  console.log({ searchLocation });
  return searchLocation;
}
function displayWeather(data) {
  console.log(data); // to check format of data being returned.

  currentTemp = data.current.temp_f;
  temperatureDegree.innerHTML = Math.floor(currentTemp);

  currentDescription = data.current.condition.text;
  temperatureDescription.innerHTML = currentDescription;

  currentTimezone = data.name;
  locationTimezone.innerHTML = `${data.location.name}, ${data.location.region}`;

  currentCode = data.current.condition.code;
}
async function fetchWeatherByCoordinates() {
  // GETTING COORDINATES REQUIRES BROWSER INPUT. DOES IT BECOME ASYNCHRONOUS?
  const promise = new Promise((resolve, reject) => {
    getCoordinates(resolve, reject);
  });

  await promise.then(() => {
    const api = `https://api.weatherapi.com/v1/current.json?key=f13b839821d04f97bf1145422211802&q=${lat},${long}`;
    // THIS MAY BE NEEDED FOR HOURLY OR FORECASTED WEATHER IF NEEDED. const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=7250132cebfb608efae470e5b346fac0`;

    fetch(api, { mode: 'cors' })
      .then((response) => response.json()) // unpackage JSON API file
      .then((data) => {
        displayWeather(data);
        setIcons(currentCode, document.querySelector('.icon'));
      });
  })
    .catch((message) => {
      setTimeout(() => console.log(message), 1000);
    });
}
async function fetchWeatherByLocation(e) {
  e.preventDefault();
  const searchLocation = submitLocation();
  const api = `https://api.weatherapi.com/v1/current.json?key=f13b839821d04f97bf1145422211802&q=${searchLocation}`;
  await fetch(api, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
      setIcons(currentCode, document.querySelector('.icon'));
    });
}
// SCRIPT---------------------------------------------------------
window.onload = () => {
  fetchWeatherByCoordinates();
  submitBtn.addEventListener('click', fetchWeatherByLocation);
};
