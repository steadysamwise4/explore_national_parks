var burgerEl = document.querySelector(".burger");
var homeBtnEl = document.querySelector("#home-button");

var pageHeadingEl = document.querySelector("#page-heading");

var bodySectionEl = document.querySelector("#body-section");
var stateSectionEl = document.querySelector("#state-section");
var stateDetailsEl = document.querySelector("#state-details");
var parkSelectorEl = document.querySelector("#park-selector");

var parks = []; // to hold the data returned from the NPS API call
var parkWeather;

function onStateSelectionChange() {
  var stateCode = $(this).val();
  var stateName = $(this).find("option:selected").text();
  pageHeadingEl.innerHTML = "Explore " + stateName;

  showElement(bodySectionEl, false);

  fetchNPsForState(stateCode)
    .then((parksInState) => {
      console.log(
        "Number of Parks in " + stateName + " " + parksInState.data.length
      );

      parks = parksInState;
      buildParksSelector(parksInState.data);
      saveViewedState(stateCode);
      showElement(parkSelectorEl, true);
      showElement(stateSectionEl, true);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
}

function buildParksSelector(pd) {
  $("#national-park").empty();

  $("#national-park").append(
    $("<option>", {
      value: -1,
      text: "Select a Park...",
    })
  );

  $.each(pd, function (i, park) {
    $("#national-park").append(
      $("<option>", {
        value: i,
        text: park.fullName,
      })
    );
  });
}

function onParkSelectionChange() {
  var idx = $(this).val();
  var name = $(this).find("option:selected").text();
  console.log("Selected Park Index = " + idx);
  console.log("Selected Park Name = " + name);

  var lat = parks.data[idx].latitude;
  var lon = parks.data[idx].longitude;

  fetchWeatherForLocation(lat, lon)
    .then((weatherData) => {
      console.log(weatherData);
      parkWeather = weatherData;
      return weatherData;
    }).then((w) => {
        buildParkDetails(idx);
        buildweatherDetails(idx, w);
        showElement(stateSectionEl, true);
        showElement(stateDetailsEl, true);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });

}

function buildParkDetails(idx) {
    $("#park-name").html(parks.data[idx].fullName);

    $("#park-description").html(parks.data[idx].description);
  
    $("#park-pic").attr("src", parks.data[idx].images[0].url);
  
    $("#park-address").html(getParkAddress(parks.data[idx].addresses));
  
    var parkEmail = getParkEmail(parks.data[idx].contacts);
    $("#park-email").html(parkEmail);
  
    var parkMapUrl = getMapLink(parks.data[idx].latitude, parks.data[idx].longitude);
    $("#park-map-link").attr("href", parkMapUrl);
  
    $("#park-hours").html(getParkHours(parks.data[idx].operatingHours));
  
    var parkPhone = getParkPhone(parks.data[idx].contacts);
    $("#park-phone").html(parkPhone);
    $("#park-website-link").attr("href", parks.data[idx].url);
  
    var parkActivities = getParkActivities(parks.data[idx].activities);
    $("#park-activities").html(parkActivities);
  
    $("#park-designation").html(parks.data[idx].designation);
}

function buildweatherDetails(idx, wd) {
    console.log("In Build Weather Details for Park " + parks.data[idx].fullName);
    console.log(wd);

    $("#curdt-time").html(moment().format("MM/DD/YYYY h:mm a"));

    $("#cur-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + wd.current.weather[0].icon + ".png");
    $("#park-temp").html(Math.round(wd.current.temp) + " °F");
    $("#park-wind").html(Math.round(wd.current.wind_speed) + " MPH");
    $("#park-humidity").html(wd.current.humidity + "%");
    $("#park-uvindex").html(wd.current.uvi);

    $("#forecast-day1").html(moment().add(1, "days").format("MM/DD/YYYY"));
    $("#day1-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + wd.daily[0].weather[0].icon + ".png");
    $("#day1-temp").html(Math.round(wd.daily[0].temp.day) + " °F");
    $("#day1-wind").html(Math.round(wd.daily[0].wind_speed) + " MPH");
    $("#day1-humidity").html(wd.daily[0].humidity + "%");
    $("#day1-uvindex").html(wd.daily[0].uvi);

    $("#forecast-day2").html(moment().add(2, "days").format("MM/DD/YYYY"));
    $("#day2-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + wd.daily[1].weather[0].icon + ".png");
    $("#day2-temp").html(Math.round(wd.daily[1].temp.day) + " °F");
    $("#day2-wind").html(Math.round(wd.daily[1].wind_speed) + " MPH");
    $("#day2-humidity").html(wd.daily[1].humidity + "%");
    $("#day2-uvindex").html(wd.daily[1].uvi);

    $("#forecast-day3").html(moment().add(3, "days").format("MM/DD/YYYY"));
    $("#day3-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + wd.daily[2].weather[0].icon + ".png");
    $("#day3-temp").html(Math.round(wd.daily[2].temp.day) + " °F");
    $("#day3-wind").html(Math.round(wd.daily[2].wind_speed) + " MPH");
    $("#day3-humidity").html(wd.daily[2].humidity + "%");
    $("#day3-uvindex").html(wd.daily[2].uvi);
}

function saveViewedState(stateCode) {
  localStorage.setItem("ParksViewedInState", stateCode);
}

function loadViewedState() {
  var stateViewed = localStorage.getItem("ParksViewedInState");
  console.log ("Previously Viewed State: " + stateViewed);
  
  fetchNPsForState(stateViewed)
  .then((parksInState) => {
    console.log(
      "Number of Parks in " + stateViewed + " " + parksInState.data.length
    );

    parks = parksInState;
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });
}

function getParkEmail(contacts) {
  var email = contacts.emailAddresses[0].emailAddress;
  return email;
}

function getParkPhone(contacts) {
  var phone = formatPhoneNumber(contacts.phoneNumbers[0].phoneNumber);
  if (contacts.phoneNumbers[0].extension) {
    phone += " x" + contacts.phoneNumbers[0].extension;
  }
  return phone;
}

function getParkHours(hours) {
  var hoursString = hours[0].description + "<br>";
  hoursString += "<strong>Standard Hours:</strong> <br>";
  hoursString += formatStandardHoursforDisplay(hours[0].standardHours);
  hoursString +=
    "For closures/exceptions visit National Park Website." + "<br>";
  return hoursString;
}

function formatStandardHoursforDisplay(stdHours) {
  var stdHoursStr = "";
  if (stdHours.monday && (stdHours.monday.toLowerCase() !== "unknown")) {
      stdHoursStr += "  Mon: " + stdHours.monday + "<br>";
  }
  if (stdHours.tuesday && (stdHours.tuesday.toLowerCase() !== "unknown")) {
    stdHoursStr += "  Tue: " + stdHours.tuesday + "<br>";
  }
  if (stdHours.wednesday && (stdHours.wednesday.toLowerCase() !== "unknown")) {
    stdHoursStr += "  Wed: " + stdHours.wednesday + "<br>";
  }
  if (stdHours.thursday && (stdHours.thursday.toLowerCase() !== "unknown")) {
    stdHoursStr += "  Thu: " + stdHours.thursday + "<br>";
  }
  if (stdHours.friday && (stdHours.friday.toLowerCase() !== "unknown")) {
    stdHoursStr += "  Fri: " + stdHours.friday + "<br>";
  }
  if (stdHours.saturday && (stdHours.saturday.toLowerCase() !== "unknown")) {
    stdHoursStr += "  Sat: " + stdHours.saturday + "<br>";
  }
  if (stdHours.sunday && (stdHours.sunday.toLowerCase() !== "unknown")) {
    stdHoursStr += "  Sun: " + stdHours.sunday + "<br>";
  }

  return stdHoursStr;
}

function getParkActivities(acts) {
  var parkActs = "";
  for (let i = 0; i < acts.length; i++) {
      parkActs += ((parkActs)?(", " + acts[i].name ):(acts[i].name ));
  }
  return parkActs;
}

function getParkAddress(addresses) {
  let i = 0;
  var addr = "";
  console.log(addresses);

  while (i < addresses.length) {
    if (addresses[i].type === "Physical") {
      addr += addresses[i].line1 + "<br>";
      if (addresses[i].line2) {
        addr += addresses[i].line2 + "<br>";
      }
      if (addresses[i].line3) {
        addr += addresses[i].line3 + "<br>";
      }
      addr +=
        addresses[i].city +
        " " +
        addresses[i].stateCode +
        " " +
        addresses[i].postalCode +
        "<br>";
      break;
    }
    i++;
  }
  console.log(addr);
  return addr;
}

function getMapLink(lat, lon) {
  return encodeURI("http://maps.google.com/maps?q=" + lat + "," + lon + "&t=h");
}

function showElement(el, show) {
    if (show) {
        if (el.classList.contains("is-hidden")) {
            el.classList.remove("is-hidden");
        }
    }
    else {
        if (!el.classList.contains("is-hidden")) {
            el.classList.add("is-hidden");
        }
    }
}

function onTopMenuButtonClick() {
  window.location.reload();
}

$(document).ready(function () {
  var pageHeading = "Explore National Parks";
  pageHeadingEl.innerHTML = pageHeading;

  // Home button click handler.
  $("#home-button").on("click", onTopMenuButtonClick);

  // States dropdown handler
  $("#state").on("change", onStateSelectionChange);

  // Parks dropdown handler
  $("#national-park").on("change", onParkSelectionChange);

  loadViewedState();
});


