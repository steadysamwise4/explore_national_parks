var form = document.getElementById('state-code-form');
var stateCodeInput = document.getElementById('state-code');
var parkData = document.getElementById('park-data');


function getParksData(event) {
    event.preventDefault();

    var state = "ks";
    console.log("state code: " + state);
    if (state) {
        getNationalParksforState(state);
    }
}

form.addEventListener('submit', getParksData);