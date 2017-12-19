var userLocation_result;
var currentUserWeather;
var pickedCuisine;

/***************************************************************************************************
 * pickRandomLocation - Picks random location from locationsArray
 * @param: {locationsArray}
 * @returns: {randomLocation} picks location from array
 * @calls:
 */

function pickRandomLocation(locationsArray) {
    var randomIndex = Math.floor(Math.random() * locationsArray.length);
    var randomLocation = locationsArray[randomIndex];
    return randomLocation;
}

/***************************************************************************************************
 * putPickedPlaceData - Adds randomly selected location to DOM
 * @param: {pickedPlace} Takes in randomly selected place
 * @returns: {none}
 * @calls:
 */

function putPickedPlaceData(pickedPlace) {
    $('#location').text(pickedPlace.title);
    $('body').css('background-image','url('+pickedPlace.imgSrc+')');
}

/***************************************************************************************************
 * initialize - Runs functions on page initializing
 * @param: {none}
 * @returns: {none}
 * @calls: {appleClickHandlers, putPickedPlaceData(locations), pickRandomLocation(locations), currentWeather}
 */

function initialize() {
    applyClickHandlers();
    pickedCuisine = pickRandomLocation(locations);
    putPickedPlaceData(pickedCuisine);
    currentWeather();
}
/***************************************************************************************************
 * geoLocateCall - calls the Google geolocation API
 * @param: {none}
 * @returns: {none}
 * @calls: Google geolocation API
 */
function geoLocateCall(){
    $('body').addClass('hideOverflow');
    $('#firstPage').fadeOut(1000);
    if ($(document).width() <= 700) {
        $('.clock').addClass('clockHide');
        $('.clockHide').fadeOut(1000);
    }
    $('#foodButton').unbind();
    console.log('hi');
    $.ajax({
        dataType:'json',
        method: 'post',
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD2P0kN9ffis_AOZUH5jrHNYdwQ6oU7wI4',
        success: function(result){
            console.log('geolocation api running at', result);
            userLocation_result = result.location;
            yelpCall();
        }
    });

}

/***************************************************************************************************
 * applyClickHandlers - adds click handlers to button
 * @param: {none}
 * @returns: {none}
 * @calls:
 */

function applyClickHandlers() {
    $('#foodButton').click(geoLocateCall);
}

/***************************************************************************************************
 * document.ready - runs function on page load
 * @param: {none}
 * @returns: {none}
 * @calls: {initialize}
 */
$(document).ready(function(){
    initialize();
});
/***************************************************************************************************
 * currentWeather - calls weather API and and appends to DOM
 * @param: {none}
 * @returns: {none}
 * @calls: {darksky API, skycons}
 */

function currentWeather(){
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var weatherAPI = 'https://api.darksky.net/forecast/40db894f8893c02949d84e53158e3c92/33.63486,-117.74053';
    console.log('weather box clicked');
    $.ajax({
        dataType:'json',
        method: 'get',
        url: proxy + weatherAPI,
        success: function(result){
            console.log('weather api running at', result);
            currentUserWeather = result;
            var currentSummary = currentUserWeather.currently.summary;
            var currentTemp = currentUserWeather.currently.apparentTemperature;
            var precipitationProbability = currentUserWeather.currently.precipPropbability;
            var windSpeed = currentUserWeather.currently.windSpeed;
            $('#weatherBox').text(parseInt(currentTemp) + String.fromCharCode(176));
            (function(){
                switch (currentSummary){
                    case 'Clear':
                    case 'Sunny':
                    case 'Mostly Clear':
                    case 'Mostly Sunny':
                        var canvas = $('<canvas>').attr('id','weatherIcon').css('height','30px').css('position','absolute').css('top','10px');
                        var skycons = new Skycons({"color": "rgb(255, 212, 0"});
                        $('#weatherBox').append(canvas);
                        skycons.add("weatherIcon", Skycons.CLEAR_DAY);
                        skycons.play();
                        break;
                    case 'Cloudy':
                    case 'Partly Cloudy':
                    case 'Mostly Cloudy':
                        var canvas = $('<canvas>').attr('id','weatherIcon').css('height','30px').css('position','absolute').css('top','10px');
                        var skycons = new Skycons({"color": "rgb(214, 229, 252)"});
                        $('#weatherBox').append(canvas);
                        skycons.add("weatherIcon", Skycons.PARTLY_CLOUDY_DAY);
                        skycons.play();
                        break;
                    case 'Rain':
                    case 'Light Rain':
                        var canvas = $('<canvas>').attr('id','weatherIcon').css('height','30px').css('position','absolute').css('top','10px');
                        var skycons = new Skycons({"color": "rgb(90, 150, 252)"});
                        $('#weatherBox').append(canvas);
                        skycons.add("weatherIcon", Skycons.RAIN);
                        skycons.play();
                        break;
                }
            })();
        }
    });
}