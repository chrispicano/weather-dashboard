$(document).ready(function () {
    //Trying the method from demo; removes error msgs in console, but still no functionality
    //MY API key 
    const myKey = "&appid=6277480031780c20e494b59b5119d621";

    //Open Weather URLs
    const onecall = "http://api.openweathermap.org/data/2.5/onecall?units=imperial&";
    const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

    //Current Date via moment.JS
    const currentDay = moment().format("MMMM Do YYYY");

    var cityName = document.getElementById("city-name");
    var cities = document.getElementById("city-list");
    var currentCity = document.getElementById("city");
    var currentTemp = document.getElementById("temperature");
    var currentHumidity = document.getElementById("humidity");
    var currentWinds = document.getElementById("winds");
    var uvIndex = document.getElementById("UV-index");
    var forecast = document.getElementById("main-weather");
    var forecastImg = document.getElementById("weather_image");


    //Search Button
    $("#search").on("click", function () {

        getCurrentWeather();
    })

    //Current Weather 
    function getCurrentWeather() {
        // console.log("Your Search")
        var name = cityName.value;

        // console.log(weatherUrl)

        //API Call
        var currentWeather = weatherUrl + name + myKey;

        fetch(currentWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (weatherdata) {
                // console.log(weatherdata)
                currentCity.textContent = weatherdata.name + " (" + currentDay + ")";
                currentTemp.textContent = "Temperature : " + weatherdata.main.temp + " F";
                currentHumidity.textContent = "Humidity : " + weatherdata.main.humidity + " %";
                currentWinds.textContent = "Winds : " + weatherdata.wind.speed + " mph";
                // console.log("latitude ",weatherdata.coord.lat)
                // console.log("longitude ",weatherdata.coord.lon)
                getUvIndex(weatherdata.coord.lat,weatherdata.coord.lon)
                fiveDay(weatherdata.coord.lat,weatherdata.coord.lon)
            });
    };

function getUvIndex(lat,lon){
    //UV Index (still not working right)
    // var latitude = weatherdata.coord.lat;
    // var longitude = weatherdata.coord.lon;

    var uvdata = onecall + "lat=" + lat + "&lon=" + lon + myKey;
    // console.log("url: ", uvdata)

    fetch(uvdata)
        .then(function (response) {
            return response.json();
        })
        .then(function (uvdata) {

            // console.log("uvdata", uvdata.daily[0].uvi)
            uvIndex.textContent = "UV-Index : ";
            var uvCurrent = uvdata.daily[0].uvi;
            // console.log(uvCurrent)
            var p = document.createElement("p");
            uvIndex.appendChild(p);
            p.textContent = uvCurrent;

            if (uvCurrent <= 2) {
                p.setAttribute("class", "badge bg-success");
            } else if (uvCurrent <= 6) {
                p.setAttribute("class", "badge bg-warning");
            } else if (uvCurrent > 6) {
                p.setAttribute("class", "badge bg-danger");
            }

        });
    }

    //5-Day Forecast
    function fiveDay(lat,lon) {
    var forecastdata = onecall + "lat=" + lat + "&lon=" + lon + myKey;
    fetch(forecastdata)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
             //forecast.textContent = "";
             

            // for (i = 1; i < 6; i++){
            // var daily = new Date(data.daily[i].dt * 1000);
            // var dailyForecast = moment().format("MMMM Do YYYY");

            // var day1 = document.getElementById("day1");
            // var day2 = document.getElementById("day2");
            // var day3 = document.getElementById("day3");
            // var day4 = document.getElementById("day4");
            // var day5 = document.getElementById("day5");
            // }
            console.log("this is fiveday",data.daily)
            for (i=0; i < 5; i++) {
                console.log(data.daily[i])
                
            }
        })
    }

    //Local Storage
    cities.textContent = "";

    var cityQuery = localStorage.getItem("cityName");
    if (cityQuery === null) {
        cityQuery = [];
    } else {
        cityQuery = JSON.parse(cityQuery);
    }
    cityQuery.push(cityName);
    var pastCities = JSON.stringify(cityQuery);
    localStorage.setItem("cityName", pastCities);


    //Clear Button
    $("clear").click(function () {
        localStorage.clear();
        cityList.removeChild(pastCities);
    })
})
