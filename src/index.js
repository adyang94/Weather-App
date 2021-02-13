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
  return skycons.set(iconID, Skycons[currentSkycon]);
}
// SCRIPT---------------------------------------------------------
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(`Coordinates:  ${lat}, ${long}`);

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=7250132cebfb608efae470e5b346fac0`;

      // THIS MAY BE NEEDED FOR HOURLY OR FORECASTED WEATHER IF NEEDED. const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=7250132cebfb608efae470e5b346fac0`;

      console.log(`API: ${api}`);

      fetch(api, { mode: 'cors' })
        .then((response) => response.json())
        .then((data) => {
          // RETRIEVING DATA FROM API
          console.log(data);
          currentTemp = (data.main.temp - 273) * (9 / 5) + 32;
          temperatureDegree.innerHTML = Math.floor(currentTemp);

          currentDescription = data.weather[0].description;
          temperatureDescription.innerHTML = currentDescription;

          currentTimezone = data.name;
          locationTimezone.innerHTML = `${currentTimezone}`;

          currentIcon = data.weather[0].main;

          // SET ICON
          setIcons(currentIcon, document.querySelector('.icon'));
        });
    });
  }
};
