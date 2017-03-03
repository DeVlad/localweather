// Locaton
//TODO: Promise race between multiple location APIs
function locationRequest() {
    $.ajax({
        url: "https://ip.nf/me.json",
        dataType: 'jsonp',
        success: function (response) {
            //TODO: Fail and check values lon lat. Make function.            
            //lat = response.lat;
            //lon = response.lon;            
            lat = response.ip.latitude;
            lon = response.ip.longitude;
            //Test - USA, New York, Central Park
            //lon = -73.96;
            //lat = 40.78;
            // response.country = "United States";
            units = "metric";
            displayTempUnits = "<span class='units'>&#8451<span>";
            displayWindUnits = "meter/sec";
            // Imerial system country list - USA , Liberia, Myanmar
            if (response.ip.country == "United States" || response.ip.country == "Liberia" || response.ip.country == "Myanmar") {
                units = "imperial";
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
            //console.log(response);
            //Render data
            setBackground(response.weather[0].id);
            var sky = response.weather[0].main;
            var temperature = String(Math.round(Number(response.main.temp))) + displayTempUnits;
            var description = response.weather[0].description;
            var location = response.name;
            var icon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var wind = "";
            if (response.wind.deg !== undefined) {
                wind = getWindDirection(response.wind.deg) + " " + response.wind.speed + " " + displayWindUnits;
            }
            // If no wind direction
            else {
                wind = response.wind.speed + " " + displayWindUnits;
            }
            $("#location").html(location);
            $("#icon").prepend('<img id="theImg" src="' + icon + '" />');
            $("#temperature").html(temperature);
            $("#sky").html(sky);
            $("#description").html(description);
            $("#wind").html(wind);
            /*  TODO:         
                response.main.humidity
                response.pressure                            
            */
        }
    });
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
// Background image change
function setBackground(id) {
    var condition = "default";
    if (id == 800) {
        condition = "clear-sky";
    }
    if (id >= 300 && id <= 531) {
        // 3xx: Drizzle & Group 5xx: Rain
        condition = "rain";
    }
    else if (id >= 801 && id <= 804) {
        // 80x
        if (id == 801) {
            condition = "few clouds";
        }
        if (id == 802) {
            condition = "scattered-clouds";
        }
        if (id == 803) {
            condition = "broken-clouds";
        }
        if (id == 804) {
            condition = "overcast-clouds";
        }
    }
    else if (id >= 600 && id <= 622) {
        // 6xx: Snow
        condition = "snow";
    }
    else if (id >= 200 && id <= 232) {
        // 2xx: Thunderstorm
        condition = "thunderstorm";
    }
    else if (id >= 900 && id <= 906) {
        // 90x: Extreme
        if (id == 904) {
            condition = "hot";
        }
        if (id == 905) {
            condition = "windy";
        }
    }
    else if (id >= 701 && id <= 781) {
        // 7xx: Atmosphere
        if (id == 701) {
            condition = "mist";
        }
        if (id == 741) {
            condition = "fog";
        }
    }
    var url = "url('img/" + condition + ".jpg')";
    document.body.style.backgroundImage = url;
}
// Refresh data on click
/*
$("#button").click(function () {
    // locationRequest();
    weatherRequest();
});
*/