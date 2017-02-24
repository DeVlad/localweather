// Locaton
function locationRequest() {
    $.ajax({
        url: "http://ip-api.com/json/",
        dataType: 'jsonp',
        success: function (response) {
            console.log(response);
            //lat = String(response.lat);
            //lon = String(response.lon);
            lat = response.lat;
            lon = response.lon;
            // $("#lon").text(lon);
            // $("#lat").text(lat);
            //TODO: Fail and check values lon lat   
            weatherRequest();
        }
    });
};
locationRequest();
// To Do language? - &lang={lang} 
// &units=metric
// "&lang=bg&"
function weatherRequest() {
    //console.log("wr", lat, lon);
    // TODO if lat and lon are not present throw error
    var units = "metric";
    var url = $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&" + "lon=" + lon + "&" + "units=" + units + "&" + "appid=6a98c6183cbd635f197b040460d18089",
        dataType: 'jsonp',
        success: function (response) {
            console.log(response);
            //render data        
            var sky = response.weather[0].main;
            var temperature = Math.round(Number(response.main.temp));
            var location = response.name;
            console.log("TEMP:", temperature);
            console.log("Location:", location)
                // $("h2").html(JSON.stringify(response));
            $("#sky").html(sky);
            $("#temperature").html(temperature);
            $("#location").html(location);
            //$("p").html(url);
            /*  
            Idea - to do wind direction 
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