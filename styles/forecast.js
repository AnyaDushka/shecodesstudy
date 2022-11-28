function formatDay(timestamp){
    let date =new Date(timestamp*1000);
    let day=date.getDay();
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[day];
}

function displayForecast(responce){
    // console.log(responce.data.daily);
    let forecast=responce.data.daily;
    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class="row">`;

    forecast.forEach(function(forecastDay,index){
        if (index<6){
    forecastHTML=forecastHTML +  `
    <div class="col-2">
        <div class="card-forecast" id="card-forecast">
            <div class="card-body" id="card-body">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                alt="" width="50">
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
            </div>
         </div>
    </div>`;
    }});
    forecastHTML=forecastHTML+`</div>`;

    forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "5201594abea9f3e38b70e65b11a80c24";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    // console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);

}