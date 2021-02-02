var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

button.addEventListener('click',function() {
    fetch("api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=f7bc0f30ff37764dc99db27b72abe0be")
    .then(response => response.json())
    .then(data => {
        var nameValue = data["name"];
        var tempValue = data ["main"]["temp"];
        var descValue = data["weather"][0]["description"];

        name.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        desc.innerHTML = descValue;
    })
})