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

const weatherApiKey = "3c5d9ad567245f91ed996395bc228529";

// get lat and lon for location

// display the current time & date
const date = moment().format("[It is ]dddd, MMMM Do, YYYY <br> [The current time is ]h:mm A")
$('#currentDay').html(date);

// refresh every minute
function setupRefresh() {
    setInterval(refreshBlock,60000);
};
setupRefresh()

function refreshBlock() {
    $('#currentDay').html(new moment().format("[It is ]dddd, MMMM Do, YYYY <br> [The current time is ]h:mm A"))
};

});
