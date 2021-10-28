var NPS_API_KEY = "Up5Uvv8A3J8sDp4LRjccKnWfqDHVRcbYRy3NBOPp";
var parksInState_URL = 
"https://developer.nps.gov/api/v1/parks?api_key=" + NPS_API_KEY +"&stateCode=";


// call the API to get the parks data
/* 
function getNationalParksforState(stateCode) {

    var getParksURL = parksInState_URL + stateCode;
    console.log("Going to fetch this URL: " + getParksURL);
    fetch(parksInState_URL).then(function (response) {
            //if response is okay, no errors found
        if (response.ok) {
            response.json().then(function (data) {
                console.log("get Parks Data " + stateCode + ": " );
                console.log(data);
            }
        });

    });
}
 */

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
              console.log("get Parks Data for state of " + stateCode + ": " );
              console.log(data);
          });
      } 
      else {
          //if city name is invalid return error message
        alert("Data not found for State! ");
      }
    });
  }

  