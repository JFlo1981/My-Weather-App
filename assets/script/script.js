// Weather Dashboard Challenge 6 PseudoCode

// 1. Explore Open Weather API and Documentation\
// 2. Figure out to get an API-Key for Open Weather API (which may involve making an account)
// 3. Create a search box
    // -HTML markup, css
    // API call to run onClick of the search button 
    // Pass the user input into the url of the API call appropriately
// 4. Display the queried city's information on the dashboard for the user to see including forecast
// 5. When we display the city's UV index, we want to display it in a color that matches the number 
// 6. Store the user's search history in local storage
//    -get the user's search history and display it in the search dropdown 
//    -when the user clicks the city from the dropdown, pass the city into the api call to get and display the info from that city again

// HINT: Abstract API call to a function with a city as the parameter to be passed into the url 

$(document).ready(function () {
 
const apiKey = "3c5d9ad567245f91ed996395bc228529";

// displays the current time and date
const date = moment().format("[It is ]dddd, MMM Do, YYYY <br> [The current time is ]h:mm A")
$('#currentDay').html(date);

// set refresh every minute
function setupRefresh() {
    setInterval(refreshBlock,60000);
};
    setupRefresh()

// display new moment each 60 secs
function refreshBlock() {
    $('#currentDay').html(new moment().format("[It is ]dddd, MMM Do, YYYY <br> [The current time is ]h:mm A"))
};

// get "lat" and "lon" for forecast weather
function getUserLoc(citySearch) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        $('#currentCity').html(data.name);
        getLatAndLon(lat, lon);
    })
};

// get weather data from lat and lon API fetch
function getLatAndLon(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}&units=imperial`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        // to be displayed in current weather section
        $('#currentWeather').html(`
        <p>Temperature: ${data.current.temp.toFixed(1)} \xB0F</p>
        <p>Wind Speed: ${data.current.wind_speed.toFixed(0)} MPH</p>
        <p>Humidity: ${data.current.humidity}%</p>`)

        $('#currentIcon').html(`
        <p class="has-text-centered"><img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png"></p>
        <p>UV Index: ${data.current.uvi}</p>`)

        // to be displayed in 5-day forecast
        var htmlCode = '';
        for (let i=0; i < 5; i++) {
            htmlCode += `
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="subtitle is-marginless">${moment().add(i+1, 'days').format("MMM Do")}</p>
                <p><img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"></p>
                <p>High: ${data.daily[i].temp.max.toFixed(1)} \xB0F</p>
                <p>Low: ${data.daily[i].temp.min.toFixed(1)} \xB0F</p>
                <p>Wind: ${data.daily[i].wind_speed.toFixed(0)} MPH</p>
                <p>Hum: ${data.daily[i].humidity}%</p>
              </article>
            </div>`
        }
        $('#dailyWeather').html(htmlCode);

    })
};

// search feature for user input bar/button
$('#searchBtn').on('click', function(event) {
    event.preventDefault()
    const citySearch = $('#search').val();
    getUserLoc(citySearch);
}); 

});
