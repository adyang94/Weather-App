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
const searchBox = document.querySelector('#searchLocation');
const submitBtn = document.querySelector('#submitBtn');

// FUNCTIONS------------------------------------------------------
function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: 'white' });
  // MATCHING API ICON NAMES WITH SKYCONS
  switch (icon) {
    case 'Clear':
      icon = 'clear day';
      break;
    case 'Clouds':
      icon = 'cloudy';
      break;
    case 'Mist':
      icon = 'fog';
      break;
    default:
      break;
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

  currentIcon = currentDescription;
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
        setIcons(currentIcon, document.querySelector('.icon'));
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
      setIcons(currentIcon, document.querySelector('.icon'));
    });
}
// SCRIPT---------------------------------------------------------
window.onload = () => {
  fetchWeatherByCoordinates();
  submitBtn.addEventListener('click', fetchWeatherByLocation);
};
