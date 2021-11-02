// sam's api key
var key = "Hk3f7lw3henzsLy9mgZB5MvklVmdKkM87KKPROJy";

var parkOneEl = document.querySelector("#park-one");
var parkTwoEl = document.querySelector("#park-two");
var parkThreeEl = document.querySelector("#park-three");
var parkFourEl = document.querySelector("#park-four");
var parkFiveEl = document.querySelector("#park-five");
var parkSixEl = document.querySelector("#park-six");

var errorEl = document.querySelector(".error");

var parkListEl = document.querySelector(".park-list");
var parkDataEl = document.querySelector("#park-link");
var heroPicEl = document.querySelector(".hero");
var mainHeadingEl = document.querySelector(".top");
var currentWeatherEl = document.querySelector(".weather");




var buttonClickHandler = function(event) {
    var park = event.target.getAttribute("data-park");
    getParksData(park);
    
}

var displayParkButtons = function(npsData) {
    var displayParkLinks = function(i, park) {
    var one = npsData.data[i].fullName;
    park.textContent = one;

    }
    displayParkLinks(0, parkOneEl);
    displayParkLinks(1, parkTwoEl);
    displayParkLinks(2, parkThreeEl);
    displayParkLinks(3, parkFourEl);
    displayParkLinks(4, parkFiveEl);
    displayParkLinks(5, parkSixEl);
}

var errorText = function() {
    var error = "Something went wrong!";
    errorEl.textContent = error;
    setTimeout(function() {errorEl.textContent = ""; }, 2000);
    }


var getParkNames = function() {
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=MN&stateCode=&limit=10&api_key=Hk3f7lw3henzsLy9mgZB5MvklVmdKkM87KKPROJy";
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
        response.json().then(function(data) {
            displayParkButtons(data)
            console.log(data);
        });
        } else {
            errorText();
        }
    });
}

var getParksData = function(park) {
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=MN&stateCode=&limit=10&api_key=Hk3f7lw3henzsLy9mgZB5MvklVmdKkM87KKPROJy";
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
        response.json().then(function(data) {
            displayParkData(data, park);           
        });
        } else {
            errorText();
        }
    });
}

var displayParkData = function(nps, i) {
    // clear old
    parkDataEl.innerHTML = "";
    heroPicEl.innerHTML = "";
    mainHeadingEl.innerHTML = "";

    // heading
    var heading = nps.data[i].fullName;
    var headingEl = document.createElement('p');
    headingEl.classList = "title park-title";
    headingEl.textContent = heading;
    parkDataEl.appendChild(headingEl);

     
    // add image to the dom
    var image = nps.data[i].images[0].url;
    var figureEl = document.createElement("figure");
    figureEl.classList = "image is-2by1";
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", image);
    figureEl.appendChild(imgEl);
    parkDataEl.appendChild(figureEl);

    // caption
    var caption = nps.data[i].images[0].caption;
    var captionEl = document.createElement('p');
    captionEl.classList = "caption";
    captionEl.textContent = caption;
    parkDataEl.appendChild(captionEl);

    // description
    var descript = nps.data[i].description;
    var descriptEl = document.createElement("p");
    descriptEl.classList = "description";
    descriptEl.textContent = descript;
    parkDataEl.appendChild(descriptEl);

    // cost
    var cost = nps.data[i].entranceFees[0].cost;
    var costEl = document.createElement('h3');
    costEl.classList = "info";
    costEl.textContent = "Cost: $" + cost;
    parkDataEl.appendChild(costEl);

    // address
    var street = nps.data[i].addresses[0].line1;
    var city = nps.data[i].addresses[0].city;
    var state = nps.data[i].addresses[0].stateCode;
    var address = street + " - " + city + ", " + state;
    var addressEl = document.createElement("p")
    addressEl.classList = "info";
    addressEl.textContent = "Located at: " + address;
    parkDataEl.appendChild(addressEl);

    // more room for activities
    var activeHeading = document.createElement("h4");
    activeHeading.classList = "info"
    activeHeading.textContent = "Activities include:"
    parkDataEl.appendChild(activeHeading);
    var activitiesEl = document.createElement("p");
    activitiesEl.classList = "activities";
    var activArr = nps.data[i].activities;
    var activityListArr = [];
    activArr.forEach(function(obj){
    activityListArr.push(obj.name);
    })
    activitiesEl.textContent = JSON.stringify(activityListArr);
    parkDataEl.appendChild(activitiesEl);

    // weather info
    var weatherHeading = document.createElement("h4");
    weatherHeading.classList = "info"
    weatherHeading.textContent = "Weather info:"
    parkDataEl.appendChild(weatherHeading);
    var weather = nps.data[i].weatherInfo;
    var weatherEl = document.createElement("p");
    weatherEl.classList = "activities";
    weatherEl.textContent = weather;
    parkDataEl.appendChild(weatherEl);

    // format latitude and longitude
    var lat = nps.data[i].latitude;
    var lon = nps.data[i].longitude;

    // current weather
    // var currentWeather = 
    // var currentWeatherEl = document.createElement("p")

    getForecastData(lat, lon);
}

var getForecastData = function(latitude, longitude) {
    //format the open weather api forcast url
    var apiForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=9ac94d5206a0a04e92ba7cbf64fe39f8";
    // make the request to the url
    fetch(apiForecast).then(function(response) {
        response.json().then(function(data) {
            displayForecastData(data);
        });
    });
}

 var displayForecastData = function(weather) {
    console.log(weather);
    // clear old
    currentWeatherEl.innerHTML = "";

    // current weather heading
    var currentWeatherHeading = "Current Conditions:"
    var currentWeatherHeadingEl = document.createElement("h4");
    currentWeatherHeadingEl.classList = "info";
    currentWeatherHeadingEl.textContent = currentWeatherHeading;
    currentWeatherEl.appendChild(currentWeatherHeadingEl);

    // weather  brief description
    var weatherDescript = weather.current.weather[0].description;
    var weatherDescriptEl = document.createElement("p")
    weatherDescriptEl.classList = "activities";
    weatherDescriptEl.textContent = weatherDescript;
    currentWeatherEl.appendChild(weatherDescriptEl);
     
    // temp
    var temp = Math.round(weather.current.temp);
    var tempEl = document.createElement("p");
    tempEl.classList = "activities";
    tempEl.textContent = "Currently: " + temp + "°F";
    currentWeatherEl.appendChild(tempEl);
}

getParkNames();
parkListEl.addEventListener("click", buttonClickHandler);
