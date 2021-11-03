const FORECAST_URL =
  "https://api.openweathermap.org/data/2.5/onecall?lat=<LATITUDE>&lon=<LONGITUDE>&units=imperial&exclude=minutely,hourly&appid=<APIKEY>";
const MY_API_KEY = "4fdcc0bfa551e7f510fce13137ab62cb";

// To get a properly encoded API URL to pull the five day Forecast data for the supplied latitude and longitude.
// This method takes the const API template URL for forecast and replaces the <LATITUDE> with the supplied latitide,
// the <LONGITUDE> with the supplied longitude, and the <APIKEY> with my API key. Then encodes the URL properly so that
// any spaces and/or special chars are handled properly.
function getForecastAPIUrl(lat, lon) {
  var url = FORECAST_URL;
  var forecastAPIURL = encodeURI(
    url
      .replace("<LATITUDE>", lat)
      .replace("<LONGITUDE>", lon)
      .replace("<APIKEY>", MY_API_KEY)
  );
  //console.log("forecastAPIURL = " + forecastAPIURL);
  return forecastAPIURL;
}

function getWeatherforLocation(lat, lon) {
  ///5-day forecast API
  var forecastUrl = getForecastAPIUrl(lat, lon);
  console.log("API URL for Forecast: " + forecastUrl);

  fetch(forecastUrl).then(function (forecastResp) {
    if (forecastResp.ok) {
      forecastResp
        .json()
        .then(function (foreData) {
          console.log("5-day Forecast for " + city + ": ");
          console.log(foreData);

          cityWeatherData["forecastData"] = foreData;
        })
    } else {
      alert("Weather Forecast Info not found for City: " + city);
    }
  });
}


async function fetchWeatherForLocation(lat, lon) {
  ///5-day forecast API
  var forecastUrl = getForecastAPIUrl(lat, lon);
  console.log("Going to fetch this URL for Forecast: " + forecastUrl);

  let response = await fetch(forecastUrl);
  if (!response.ok) {
    var message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  var weatherData = await response.json();
  console.log(weatherData);

  return weatherData;
}