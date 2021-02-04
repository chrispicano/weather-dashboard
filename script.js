var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var weatherName = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var date = document.querySelector(".date");
console.log("in the script file");
button.addEventListener('click', function () {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value+"&units=imperial" + "&appid=f7bc0f30ff37764dc99db27b72abe0be")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var nameValue = data["name"];
            var tempValue = data["main"]["temp"];
            var descValue = data["weather"][0]
            ["description"];
            var dateValue = new Date(data["dt"]*1000);

            weatherName.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
            date.innerHTML = dateValue.toDateString();


        })
})

 
//look up post method with fetch