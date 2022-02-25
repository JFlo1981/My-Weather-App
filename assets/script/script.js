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
const date = moment().format("[It is ]dddd, MMM Do, YYYY <br> [Your current time is ]h:mm A")
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
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`
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

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}&units=imperial`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)

        // sets the current wind degree to direction strings
        let currentDirection;
        let currWindDeg = data.current.wind_deg 
        
        if (currWindDeg >= 337.6 && currWindDeg <= 360 || currWindDeg >= 0 && currWindDeg <= 22.5) {
            currentDirection = "N";
        } else if (currWindDeg >= 22.6 && currWindDeg <= 67.5) {
            currentDirection = "NE";
        } else if (currWindDeg >= 67.6 && currWindDeg <= 112.5) {
            currentDirection = "E";
        } else if (currWindDeg >= 112.6 && currWindDeg <= 157.5) {
            currentDirection = "SE";
        } else if (currWindDeg >= 157.6 && currWindDeg <= 202.5) {
            currentDirection = "S";
        } else if (currWindDeg >= 202.6 && currWindDeg <= 247.5) {
            currentDirection = "SW";
        } else if (currWindDeg >= 247.6 && currWindDeg <= 292.5) {
            currentDirection = "W";
        } else if (currWindDeg >= 292.6 && currWindDeg <= 337.5) {
            currentDirection = "NW";
        }

        // display of the current weather fetch data
        $('#currentWeather').html(`
        <p>Temperature: ${data.current.temp.toFixed(1)} \xB0F</p>
        <p>Wind: ${currentDirection} ${data.current.wind_speed.toFixed(0)} mph</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <div id="uvTile" class="mx-6">
        <p>UV Index: ${data.current.uvi}</p>
        </div>`)

        $('#currentIcon').html(`
        <p class="has-text-centered"><img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png"></p>
        `)

        // sets the daily wind degree to direction strings
    for (let i=0; i < 5; i++) {
        var dailyWindDeg = data.daily[i].wind_deg
        var dailyDirection;
        if (dailyWindDeg >= 337.6 && dailyWindDeg <= 360 || dailyWindDeg >= 0 && dailyWindDeg <= 22.5) {
            dailyDirection = "N";
        } else if (dailyWindDeg >= 22.6 && dailyWindDeg <= 67.5) {
            dailyDirection = "NE";
        } else if (dailyWindDeg >= 67.6 && dailyWindDeg <= 112.5) {
            dailyDirection = "E";
        } else if (dailyWindDeg >= 112.6 && dailyWindDeg <= 157.5) {
            dailyDirection = "SE";
        } else if (dailyWindDeg >= 157.6 && dailyWindDeg <= 202.5) {
            dailyDirection = "S";
        } else if (dailyWindDeg >= 202.6 && dailyWindDeg <= 247.5) {
            dailyDirection = "SW";
        } else if (dailyWindDeg >= 247.6 && dailyWindDeg <= 292.5) {
            dailyDirection = "W";
        } else if (dailyWindDeg >= 292.6 && dailyWindDeg <= 337.5) {
            dailyDirection = "NW";
        }
    };
        // display of the daily weather fetch data
        let htmlCode = '';
        for (let i=0; i < 5; i++) {
            var dailyWindDeg = data.daily[i].wind_deg
            htmlCode += `
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="subtitle is-marginless">${moment().add(i+1, 'days').format("MMM Do")}</p>
                <p><img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"></p>
                <p>High: ${data.daily[i].temp.max.toFixed(1)} \xB0F</p>
                <p>Low: ${data.daily[i].temp.min.toFixed(1)} \xB0F</p>
                <p>Wind: ${dailyDirection} ${data.daily[i].wind_speed.toFixed(0)} mph</p>
                <p>Hum: ${data.daily[i].humidity}%</p>
              </article>
            </div>`
            console.log(dailyWindDeg);
        }


        $('#dailyWeather').html(htmlCode);

        // sets the UV index color based on current search city UVI
        const UVI = data.current.uvi

            if (UVI >= 0 && UVI <= 2) {
                $('#uvTile').css("background-color", '#60D394').css("color", "white");
            } else if (UVI > 2 && UVI <= 5) {
                $('#uvTile').css("background-color", '#F9E900');
            } else if (UVI > 5 && UVI <= 7) {
                $('#uvTile').css("background-color", '#F55F14').css("color", "white");
            } else if (UVI > 7 && UVI <= 10) {
                $('#uvTile').css("background-color", '#AE1010').css("color", "white");
            } else {
                $('#uvTile').css("background-color", '#A416D3').css("color", "white");
            } 
            
           

        
    })
};

// search feature for user input bar/button
$('#searchBtn').on('click', function(event) {
    event.preventDefault()
    const citySearch = $('#search').val();
    getUserLoc(citySearch);
}); 

});
