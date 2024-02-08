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

