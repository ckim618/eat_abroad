var userLocation_result;
var currentUserWeather;
var pickedCuisine;
var weatherLatitude;
var weatherLongitude;

/***************************************************************************************************
 * pickRandomLocation - Picks random location from locationsArray
 * @param: {locationsArray}
 * @returns: {randomLocation} picks location from array
 * @calls:
 */

function pickRandomLocation(locationsArray) {
    var randomIndex = Math.floor(Math.random() * locationsArray.length);
    var localStorageIndex = localStorage.getItem('storageIndex')
    if(localStorageIndex == randomIndex) {
        var exclude = localStorageIndex;
        while(localStorageIndex == exclude) {
            randomIndex = Math.floor(Math.random() * locationsArray.length);
        }
    }
    var randomLocation = locationsArray[randomIndex];
    localStorage.setItem('storageIndex', randomIndex);    
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
    $('body').css("background", "url('"+pickedPlace.imgSrc+"')");
}

/***************************************************************************************************
 * initialize - Runs functions on page initializing
 * @param: {none}
 * @returns: {none}
 * @calls: {appleClickHandlers, putPickedPlaceData(locations), pickRandomLocation(locations), currentWeather}
 */

function initialize() {
    currentWeatherLocation();    
    $('.cs-loader').hide();
    applyClickHandlers();
    pickedCuisine = pickRandomLocation(locations);
    putPickedPlaceData(pickedCuisine);
    startTime();
    moveUnderline();
    $(window).on('load',function() {
        currentWeather();
    })
}
/***************************************************************************************************
 * geoLocateCall - calls the Google geolocation API
 * @param: {none}
 * @returns: {none}
 * @calls: Google geolocation API
 */
function geoLocateCall(){
    $('body').addClass('hideOverflow');
    $('#firstPage').fadeOut(750);
    $('.clock').addClass('clockHide');
    $('.clockHide, #weatherBox').fadeOut(750);
    $('#foodButton').unbind();
    $('.cs-loader').show();
    $.ajax({
        dataType:'json',
        method: 'post',
        wifiAccessPoints: [],
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
    $('#foodButton').on('click', geoLocateCall);
    $('#countryButton').on('click', pickAnotherCountry)
    $(document).on('click', '.returnButton', returnButton);
}

/***************************************************************************************************
 * returnButton - Removes elements from yelp info and maps then picks another location for the user to chose from
 * @param: {none}
 * @returns: {none}
 * @calls: { pickRandomLocation, putPickedPlaceData, currentWeather, geoLocateCall }
 */
function returnButton() {
    $('#weatherBox').css('display', 'flex');
    $('#firstPage').css('display', 'flex');
    $('.row, .returnButton, #googleMaps').remove();
    pickedCuisine = pickRandomLocation(locations);
    putPickedPlaceData(pickedCuisine);
    currentWeather();
    moveUnderline();
    $('.clock').removeClass('clockHide').css('display', 'inline-block');
    $('#foodButton').on('click', geoLocateCall);
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
    var weatherAPI = 'https://api.darksky.net/forecast/40db894f8893c02949d84e53158e3c92/'+weatherLatitude+','+weatherLongitude; 
    var key = 'AIzaSyD2P0kN9ffis_AOZUH5jrHNYdwQ6oU7wI4';   
    $.when($.ajax({
        dataType:'json',
        method: 'get',
        url: proxy + weatherAPI,
        success: function(result){
            console.log('weather', result)
            currentUserWeather = result;
            var currentTemp = currentUserWeather.currently.apparentTemperature;
            $('#weatherBox').text(parseInt(currentTemp) + String.fromCharCode(176));
        }
    })).then(function() {
        $.ajax({
            dataType: 'json',
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+weatherLatitude+','+weatherLongitude+'&key='+key,
            success: function(result) {
                console.log('google geocode', result);
                var city = result.results[0].address_components[2].long_name;
                var state = result.results[0].address_components[4].short_name;
                var cityDiv = $('<div>').text(city+', '+state).addClass('cityName');                
                $('#weatherBox').append(cityDiv);
            }
        })
    })
}
/***************************************************************************************************
 * pickAnotherCountry - 
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */
 function pickAnotherCountry() {
    pickedCuisine = pickRandomLocation(locations);
    putPickedPlaceData(pickedCuisine);
 }
/***************************************************************************************************
 * moveUnderline - moves the position of underline hr to be under the hovered button 
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */
function moveUnderline() {
    $('#foodButton').hover(function() {
        $('#underline').css('margin-left', '29%');
    });
    $('#countryButton').hover(function() {
        $('#underline').css('margin-left', '56%');
    });
}

function currentWeatherLocation() {
    $.ajax({
        dataType:'json',
        method: 'post',
        wifiAccessPoints: [],
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD2P0kN9ffis_AOZUH5jrHNYdwQ6oU7wI4',
        success: function(result){
            weatherLatitude = result.location.lat;
            weatherLongitude = result.location.lng;
        }
    }); 
}