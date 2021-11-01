var NPS_API_KEY = "Up5Uvv8A3J8sDp4LRjccKnWfqDHVRcbYRy3NBOPp";
var parksInState_URL =
  "https://developer.nps.gov/api/v1/parks?api_key=" +
  NPS_API_KEY +
  "&stateCode=";

var parksData = [];

function getNationalParksforState(stateCode) {
  // event.preventDefault();

  //current conditions in user-entered city//using it to get long and latitude for One call weather API url
  var getParksURL = parksInState_URL + stateCode;
  console.log("Going to fetch this URL: " + getParksURL);

  //make a request to the url
  fetch(getParksURL).then(function (response) {
    //if response is okay, no errors found
    if (response.ok) {
      response.json().then(function (data) {
        console.log("get Parks Data for state of " + stateCode + ": ");
        console.log(data);
      });
    } else {
      //if city name is invalid return error message
      alert("Data not found for State! ");
    }
  });
}

async function fetchNPsForState(stateCode) {
  //current conditions in user-entered city//using it to get long and latitude for One call weather API url
  var getParksURL = parksInState_URL + stateCode;
  console.log("Going to fetch this URL: " + getParksURL);

  let response = await fetch(getParksURL);
  if (!response.ok) {
    var message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  var parks = await response.json();
  console.log(parks);

  return parks;
}

function getParks(state) {
  fetchNPsForState(state)
    .then((parks) => {
      parksData = parks; // fetched NP data
    })
    .catch((error) => {
      error.message; //
    });
    return parksData;
}
