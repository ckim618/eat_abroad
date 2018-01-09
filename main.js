var userLocation_result;
var currentUserWeather;
var pickedCuisine;
var weatherLatitude;
var weatherLongitude;

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
    $('.carousel').addClass('hidden');
    $('.returnButton').addClass('hideButton');
    $('.row, #googleMaps').remove();
    pickedCuisine = pickRandomLocation(locations);
    putPickedPlaceData(pickedCuisine);
    moveUnderline();
    $('.clock').removeClass('clockHide').css('display', 'inline-block');
    $('#foodButton').on('click', geoLocateCall);
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

/***************************************************************************************************
 * weatherSpinner - creates spinning icon while ajax call for getting current weather is running
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */
function weatherSpinner() {
    var iDiv = $('<i>').addClass('weatherSpinner fa fa-spinner fa-spin fa-lg fa-fw');
    $('#weatherBox').append(iDiv);
}