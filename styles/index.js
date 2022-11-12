 //date
 function formatDate(dateNow) {
    let now = new Date();

    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
    let day = days[now.getDay()];
    let hours = now.getHours();
    if (hours < 10) {
    hours = `0${hours}`;;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    let formattedDate = `${day} ${hours}:${minutes}`;

    return formattedDate;
}

// console.log(formatDate(dateNow));
    
let currentDate = document.querySelector("#date-now");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

//2
function showWeather(responce){
    // console.log(responce);
    let tempElement=document.querySelector("#temperature");
    tempElement.innerHTML=Math.round(responce.data.main.temp);
    let description=document.querySelector("#main");
    description.innerHTML=responce.data.weather[0].description;
    let icons = responce.data.weather[0].icon;
    document.querySelector("#weather-icon").innerHTML = 
    `<img src="http://openweathermap.org/img/w/${icons}.png" alt="icon" />`;
   
    document.querySelector("#visibility").innerHTML=(responce.data.visibility/1000);
    document.querySelector("#humidity").innerHTML=responce.data.main.humidity;
    document.querySelector("#wind").innerHTML=Math.round(responce.data.wind.speed);
    document.querySelector("#city-now").innerHTML=responce.data.name;
}

function search(city) {
    let apiKey = "5201594abea9f3e38b70e65b11a80c24";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
}

function clickCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
}

let button = document.querySelector("#city");
button.addEventListener("submit", clickCity);

//3
function showPosition(position){
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;
    let unit=("metric");
    let apyKey = "5201594abea9f3e38b70e65b11a80c24";
    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apyKey}&units=${unit}`;
    axios.get(apiUrlCurrent).then(showWeather);
}
function getCurrentPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton=document.querySelector("#current");
currentButton.addEventListener("click", getCurrentPosition);