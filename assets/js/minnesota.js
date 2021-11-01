// sam's api key
var key = "Hk3f7lw3henzsLy9mgZB5MvklVmdKkM87KKPROJy";

var parkOneEl = document.querySelector("#park-one");
var parkTwoEl = document.querySelector("#park-two");
var parkThreeEl = document.querySelector("#park-three");
var parkFourEl = document.querySelector("#park-four");
var parkFiveEl = document.querySelector("#park-five");
var parkSixEl = document.querySelector("#park-six");

var displayParkData = function(npsData) {
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

var getParksData = function() {
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=MN&stateCode=&limit=10&api_key=Hk3f7lw3henzsLy9mgZB5MvklVmdKkM87KKPROJy";
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayParkData(data)
        });
    });
}
getParksData();