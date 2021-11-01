var burgerEl = document.querySelector(".burger");
var homeBtnEl = document.querySelector("#home-button");

var pageHeadingEl = document.querySelector("#page-heading");

var bodySectionEl = document.querySelector("#body-section");
var stateSectionEl = document.querySelector("#state-section");
var parkSelectorEl = document.querySelector("#park-selector");

function onStateSelectionChange() {
  var stateCode = $(this).val();
  var stateName = $(this).find("option:selected").text();
  pageHeadingEl.innerHTML = "Explore " + stateName;

  bodySectionEl.classList.toggle("is-hidden");
  stateSectionEl.classList.toggle("is-hidden");

  fetchNPsForState(stateCode)
    .then((parksInState) => {
      console.log("Number of Parks in " + stateName + " " + parksInState.data.length);
      buildParksSelector(parksInState.data);
      parkSelectorEl.classList.toggle("is-hidden");
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
}

function buildParksSelector(pd) {
    $('#national-park').empty();
    $.each(pd, function (i, park) {
        $('#national-park').append($('<option>', { 
            value: park.parkCode,
            text : park.fullName 
        }));
    });

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
});



/*
http://maps.google.com/maps?q=38.44023613,-96.5670822&t=h

38.44023613
-96.5670822

*/