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
     
    // add image to the dom
    var image = nps.data[i].images[0].url;
    var figureEl = document.createElement("figure");
    figureEl.classList = "image is-2by1";
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", image);
    figureEl.appendChild(imgEl);
    parkDataEl.appendChild(figureEl);


    


}

getParkNames();
parkListEl.addEventListener("click", buttonClickHandler);
