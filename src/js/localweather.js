// Locaton
function locationRequest() {
    $.ajax({
        url: "http://ip-api.com/json/",
        dataType: 'jsonp',
        success: function (response) {
            //TODO: Fail and check values lon lat. Make function.
            console.log(response);
            lat = response.lat;
            lon = response.lon;
            //Test - USA, New York, Central Park
            //lon = -73.96;
            //lat = 40.78;
            //response.country = "United States";                    
            units = "metric"; // imperial                          
            displayTempUnits = "<span class='units'>&#8451<span>";
            displayWindUnits = "meter/sec";
            // Imerial system country list - USA , Liberia, Myanmar
            if (response.country == "United States" || response.country == "Liberia" || response.country == "Myanmar [Burma]") {
                units = "imperial"; // Imperial                          
                displayTempUnits = "<span class='units'>&#8457<span>";
                displayWindUnits = "miles/hour";
            }
            weatherRequest();
        }
    });
};
locationRequest();

function weatherRequest() {
    // TODO if lat and lon are not present throw error
    var url = $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&" + "lon=" + lon + "&" + "units=" + units + "&" + "appid=6a98c6183cbd635f197b040460d18089",
        dataType: 'jsonp',
        success: function (response) {
            console.log(response);
            //Render data
            var sky = response.weather[0].main;
            var temperature = String(Math.round(Number(response.main.temp))) + displayTempUnits;
            var description = response.weather[0].description;
            var location = response.name;
            var icon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var wind = getWindDirection(response.wind.deg) + " " + response.wind.speed + " " + displayWindUnits;
            $("#location").html(location);
            $('#icon').prepend('<img id="theImg" src="' + icon + '" />');
            $("#temperature").html(temperature);
            $("#sky").html(sky);
            $("#description").html(description);
            $("#wind").html(wind);
            //$("p").html(url);
            /*  
            Idea - to do 
                response.main.humidity
                response.pressure
                response.weather.description //Clouds
                response.weather.description //Overcast Clouds                
                response.sys.country // "BG"
                        .name //Pleven                    
            */
            setBackground();
        }
    });
}
// Refresh data on click
$("#button").click(function () {
    // locationRequest();
    weatherRequest();
});
// Background image change
function setBackground() {
    var condition = 'thunderstorm';
    var url = "url('img/" + condition + ".jpg')";
    document.body.style.backgroundImage = url;
}
// Wind Direction
function getWindDirection(degrees) {
    if (degrees < 0 || degrees > 360) {
        return "";
    }
    var x = Math.floor((degrees / 22.5) + 0.5);
    var directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return directions[x % 16];
}