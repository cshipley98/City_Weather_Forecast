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

                   
                    //add temp to dom
                    temp = documnent.querySelector("#temperature");
                    temp.innerHTML = "Temperature: " + k2f(data.main.temp) + "&#176;" + "F";

                    //add humidity do dom
                    humidity = documnent.querySelector("#humidity");
                    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";

                    //add wind to dom
                    wind = documnent.querySelector("#wind");
                    wind.innerHTML = "wind: " + data.main.wind.speed + "MPH";

                    //get IV index
                    let lat = data.coord.lat;
                    let lon = data.coord.lon;
                    let UVurl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon +  "&appid=" + apiKey;
                    fetch(UVurl)
                        .then(function(response){
                            response.json().then(function(data){

                                // add UV index to dom
                                UVindex = document.querySelector("#UV-index")
                                UVindex.innerHTML = "UV-index: + data[0].value";

                                //remove any previous class
                                UVindex.className = '';
                                //uv index is favorable, show green
                                if (data[0].value < 4){
                                    UVindex.classList.add("bg-success", "text-light", "p-1");
                                }
                                // uv index is moderate, show yellow
                                else if(data[0].value < 8){
                                    UVindex.classList.add("bg-warning", "text-light", "p-1")
                                }
                                //UV index is severse, show red
                                else {
                                    UVindex.classList.add("bg-danger", "text-ligjt", "p-1");
                                }
                            })}
                
                )});
            }
        
                // response unsuseccful
        else{
            alert("Error: did not recognize City");
        }
    })
        .catch(function(Error){
            alert("Unable to connect to Weather.com")
        })
};

                         // forecast weather data
                        var getForecastWeather = function(cityName){
                        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

                        fetch(apiUrl).then(function(response){
                        response.json().then(function(data){

                                                
                        // clear historical data
            forecastWeather.innerHTML = "";

            // loop through hourly forecast, adding 8 because forecast comes every 3 hours 
            for (var i = 1; i < data.list.length; i+=8){

                // create div element for forecast weather 
                var forecastEl = document.createElement("div");
                forecastEl.classList.add("weather-card");

                // create h5 element for date 
                var dateForecast = document.createElement("h5");
                dateForecast.textContent = new Date(data.list[i].dt*1000).toLocaleDateString();

                // create img element for weather icon
                var iconForecast = document.createElement("img");
                iconForecast.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";

                // create p element for temperature
                var tempertaureForecast = document.createElement("p");
                tempertaureForecast.innerHTML ="Temperature: " + k2f(data.list[i].main.temp) + "&#176;" + "F";
                
                // create p element for humidity 
                var humidityForecast= document.createElement("p");
                humidityForecast.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";

                // create p element for windspeed 
                var windForecast = document.createElement("p");
                windForecast.innerHTML = "Wind Speed: " + data.list[i].wind.speed + " MPH";

                // append date, weather icon temperature, wind speed, & humidity to forecastweather div 
                forecastEl.append(dateForecast);
                forecastEl.append(iconForecast);
                forecastEl.append(tempertaureForecast);
                forecastEl.append(windForecast);
                forecastEl.append(humidityForecast);

                // append forecast weather el to forecast weather div 
                forecastWeather.append(forecastEl);
            }
        })
    })
};

                //function to load weather from past search
                var cityClickerHandler = function(event){
                    
                }