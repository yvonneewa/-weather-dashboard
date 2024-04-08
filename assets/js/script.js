// Use the 5 Day Weather Forecast to retrieve weather data for cities. The base URL should look like the following: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.
// Hint: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?
// You will use localStorage to store any persistent data. For more information on how to work with the OpenWeather API, refer to the Full-Stack Blog on how to use API keys.
// 465d11928a09c237796b083357056ff9
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// {
//     "name":"London",
//     "local_names":{
//        "el":"Λόντον",
//        "fr":"London",
//        "oj":"Baketigweyaang",
//        "en":"London",
//        "bn":"লন্ডন",
//        "be":"Лондан",
//        "ko":"런던",
//        "he":"לונדון",
//        "ru":"Лондон",
//        "lt":"Londonas",
//        "hy":"Լոնտոն",
//        "ga":"Londain",
//        "ja":"ロンドン",
//        "yi":"לאנדאן",
//        "cr":"ᓬᐊᐣᑕᐣ",
//        "iu":"ᓚᓐᑕᓐ",
//        "ar":"لندن",
//        "lv":"Landona",
//        "fa":"لندن",
//        "ug":"لوندۇن",
//        "th":"ลอนดอน",
//        "ka":"ლონდონი"
//     },
//     "lat":42.9832406,
//     "lon":-81.243372,
//     "country":"CA",
//     "state":"Ontario"
//  },

/**
 * GET city name
 * get coordinates
 * get forcast
 * display city weather
 * get city name from form to function 
 * show the forecast on the screen 
 */

const form = document.getElementById(`searchForm`);
let cityInput = document.getElementById(`cityInput`);
let searchHistoryList = document.getElementById('historyList');
let searchHistory = JSON.parse(localStorage.getItem("weatherForecast")) || [];

// 1.attatches the event listener to the form. it tells the browser to execute the submit function 2.the event prevent prevents the browsers defuly behavior which is usually to reload the page 3.
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value;
    console.log("city", city)
    if (city) {
        searchWeather(city);
        searchFiveDayWeather(city)
       addToSearchHistory(city)
    } else {
        alert('Please enter a city name');
    }

    console.log(cityName);
});
function addToSearchHistory(city) {
    searchHistory.push(city);
    localStorage.setItem("weatherForecast",JSON.stringify(searchHistory))
    renderSearchHistory();
}

renderSearchHistory()
function renderSearchHistory() {
    searchHistoryList.innerHTML = ``
    searchHistory.forEach(function (city) {
        const listItem = document.createElement(`li`);
        listItem.textContent = city;
        listItem.addEventListener(`click`, function () {
            searchWeather(city);
            searchFiveDayWeather(city)
        });
        searchHistoryList.appendChild(listItem);

    });
}

const cityName = "Denver"
const apiKey = "465d11928a09c237796b083357056ff9"
const coordinates = {
    lat: 42.98,
    lon: -81.24,
}
const requestOptions = {
    method: "GET",
    redirect: "follow"
};


function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}

function getCoords(city = cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`, requestOptions)
        .then((response) => response.json())
        .then((result) => getForecast(result[0].lat, result[0].lon))
        .catch((error) => console.error(error));
}
// getCoords()

function searchWeather(city) {
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var currentWeather = `<div class="card" style="width: 18rem;">
            <h5 class="card-title">City: ${data.name}
            <span>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-top" alt="weather icon">
            </span>
            </h5>
            <div class="card-body">
          
              <p class="card-text">Temperature: ${data.main.temp}</p>
              <p class="card-text">Humidity: ${data.main.humidity}%</p>
              <p class="card-text">Wind Speed: ${data.wind.speed} mph</p>
              <p class="card-text">description: ${data.weather[0].description}</p>
            </div>
          </div>`
          document.getElementById("currentWeather").innerHTML = currentWeather
        })
}
console.log("City")

function searchFiveDayWeather(city) {
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
     fetch(url)
         .then(response => response.json())
         .then(data => {
             console.log(data)
             var fiveDay=""
             for(let i=0;i<data.list.length;i=i+8){
             fiveDay += `<div class="card" style="width: 18rem;">
             <h5 class="card-title">${data.list[i].dt_txt}
             <span>
             <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="weather icon">
             </span>
             </h5>
             <div class="card-body">
           
               <p class="card-text">Temperature: ${data.list[i].main.temp} &#8457; </p>
               <p class="card-text">Humidity: ${data.list[i].main.humidity} %</p>
               <p class="card-text">Wind Speed: ${data.list[i].wind.speed} mph</p>
               <p class="card-text">description: ${data.list[i].weather[0].description}</p>
             </div>
           </div>`
             }
           document.getElementById("futureWeather").innerHTML = fiveDay
         })
 }
 console.log("City")