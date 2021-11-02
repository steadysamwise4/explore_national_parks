var parkService = {
    key: "m0ZHfwmLdEuNDItsSeZJa0sPI25JfR4Sm49nN09i",

    displayParkData: (npsData) => {
         
        if (npsData && npsData.data && Array.isArray(npsData.data)) {
            var list = document.getElementById("park-list");
            npsData.data.forEach((park, i) => {
                var a = document.createElement("a");
                a.setAttribute("href", "#park" + i);
                var li = document.createElement("li");
                li.setAttribute("class", "park");
                li.appendChild(document.createTextNode(park.fullName));
                a.appendChild(li);
                list.appendChild(a);
            });
        }
    },
    getParksData: (stateCode) => {
        var apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&limit=10&api_key=${parkService.key}`;
        
        fetch(apiUrl).then(function(response) {
            response.json().then(function(data) {
                parkService.displayParkData(data)
            });
        });
    }
}

parkService.getParksData("MO");