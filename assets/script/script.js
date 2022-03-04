$(document).ready(function () {

    

    // displays the current time and date
    const date = moment().format("h:mm A <br> dddd, MMM Do")
    $('#currentDay').html(date);

    // set refresh every minute
    function setupRefresh1() {
        setInterval(refreshBlock1,60000);
    };
        setupRefresh1()

    // display new moment each 60 secs
    function refreshBlock1() {
        $('#currentDay').html(new moment().format("h:mm A <br> dddd, MMM Do"))
    };

    const apiKey = "13a3e9ee9e5dcaabc3e7976ad9a77077";

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
            let uvWord;
            let currentDirection;
            let currWindDeg = data.current.wind_deg 
            // sets the UV index color based on current search city UVI
            let UVI = data.current.uvi
            

                if (UVI >= 0 && UVI <= 2) {
                    uvWord = "Low";
                    $('#uvTile').css("background-color", '#60D394').css("color", "white");
                } else if (UVI > 2 && UVI <= 5) {
                    uvWord = "Moderate";
                    $('#uvTile').css("background-color", '#F9E900').css("color", "black");
                } else if (UVI > 5 && UVI <= 7) {
                    uvWord = "High";
                    $('#uvTile').css("background-color", '#F55F14').css("color", "white");
                } else if (UVI > 7 && UVI <= 10) {
                    uvWord = "Very High";
                    $('#uvTile').css("background-color", '#AE1010').css("color", "white");
                } else {
                    uvWord = "Extreme";
                    $('#uvTile').css("background-color", '#A416D3').css("color", "white");
                }
            
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
            <p class="is-size-4">Temperature: ${data.current.temp.toFixed(1)} \xB0F</p>
            <p class="is-size-4">Feels Like: ${data.current.feels_like.toFixed(1)} \xB0F</p>
            <p class="is-size-4">Wind: ${currentDirection} ${data.current.wind_speed.toFixed(0)} mph</p>
            <p class="is-size-4">Humidity: ${data.current.humidity}%</p>
            `)

            $('#currentIcon').html(`
            <p class="is-size-3">UV Index</p>
            <p class="has-text-centered"><img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png"></p>
            <p class="is-size-4">${data.current.uvi} ${uvWord}</p>
            `)

        // sets the daily wind degree to direction strings
            let htmlCode = '';
            for (let i=0; i < 5; i++) {
                var dailyWindDeg = data.daily[i].wind_deg
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

                // displays of the daily weather fetch data on the tiles
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

             
        })
    };

                // search feature for user input bar/button
                let recentCitySearch = [];
                $('#searchBtn').on('click', function(event) {
                    event.preventDefault();

                    let citySearch = $('#search').val().trim();
                    getUserLoc(citySearch);
                    if (!recentCitySearch.includes(citySearch)) {
                        recentCitySearch.push(citySearch);
                        let recentCity = $(`
                        <button class="button is-fullwidth is-info is-outlined save-group-item">${citySearch}</li>
                        `);
                        $("#savedCities").append(recentCity);
                    };

                    localStorage.setItem("citySearch", JSON.stringify(recentCitySearch));
                }); 

                // allows user to input city into search by pressing the <enter> key
                $('#search').keyup(function(event) {
                    if (event.which === 13) {
                       event.preventDefault() ;
                       $('#searchBtn').click();
                    }
                });
            
                $(document).on("click", ".save-group-item", function() {
                    let savedCity = $(this).html();
                    getUserLoc(savedCity);
                });

        let searchHistory = JSON.parse(localStorage.getItem("citySearch"));
        if (searchHistory !== null) {
            let searchIndex = searchHistory.length -1;
            let searchedCity = searchHistory[searchIndex];
            getUserLoc(searchedCity);
        }       
});
