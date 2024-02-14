// API KEY 
apiKey = "581ce92b85fceec3c210d9faa500eccb"

// variables to reference DOM
dailyWeatherEL = document.querySelector("#daily-weather")
searchBtn = document.querySelector("#search-btn");
cityNameInput = document.querySelector("#cityName");
forcastWeather = document.querySelector("#forecast-weather");
citySearchName = document.querySelector("#city-search-term");
cityList = document.querySelector("#city-list");
clearHistoryBtn = document.querySelector("#clear-history-btn");


//function to handle city submit
var formSub,itHandler = function(event){
    //prevent page from refresh
    event.preventDefault();

    //get value from input element 
    var cityName = cityNameInput.value.trim();

    if(cityName){
        //get daily weather
        getDailyWeather(cityName);
        //get forecast weather
        getForecastWeatjer(cityName);
        saveSearch();



    } else{
        alert("Please enter a City Name");
    }
}

// get daily weather temp, wind, humidity
var getDailyWeather = function(cityName){
    // format weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;

    //make a request to get data from url 
    fetch(apiUrl)
        .then(function(response){
            // successful response
            if (response.ok){
                response.json().then(function(data){

                    //add city name and data to header
                    var currentDate = new Date(data.dt*1000).toLocaleDateString();
                    citySearchName.textConetnt =cityName + '' + currentDate;

                    //add weather icon next to name in header
                    weatherIcon = document.querySelector("#weather-icon")
                    weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                }
                
                )
            }
        }
        
        )
}