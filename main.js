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
$(document).ready(function () {
    initialize();
});

/***************************************************************************************************
 * applyClickHandlers - adds click handlers to button
 * @param: {none}
 * @returns: {none}
 * @calls:
 */
function applyClickHandlers() {
    $('#foodButton').on('click', geoLocateCall);
    $('#countryButton').on('click', pickAnotherCountry);
    $('.logo').on('click', removeElements);
    //Since both butons below are created dynamically, must delegate event.
    $(document).on('click', '.returnButton', returnButton);
    $(document).on('click', '.yelpButton', yelpButton);
}


/***************************************************************************************************
 * initialize - Runs functions on page initializing
 * @param: {none}
 * @returns: {none}
 * @calls: {appleClickHandlers, putPickedPlaceData(locations), pickRandomLocation(locations), currentWeather}
 */

function initialize() {
    $('.modal').modal('show');
    currentWeatherLocation();
    $('.cs-loader').hide();
    applyClickHandlers();
    pickedCuisine = pickRandomLocation(locations);
    putPickedPlaceData(pickedCuisine);
    startTime();
    moveUnderline();
    $(window).on('load', function () {
        currentWeather();
    })
}

/***************************************************************************************************
 * moveUnderline - moves the position of underline hr to be under the hovered button 
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */
function moveUnderline() {
    $('#foodButton').hover(function () {
        $('#underline').css('margin-left', '29%');
    });
    $('#countryButton').hover(function () {
        $('#underline').css('margin-left', '56%');
    });
}


/***************************************************************************************************
 * returnButton - Removes elements from yelp info and maps then picks another location for the user to chose from
 * @param: {none}
 * @returns: {none}
 * @calls: { pickRandomLocation, putPickedPlaceData, currentWeather, geoLocateCall }
 */
function returnButton() {
    removeElements()
    putPickedPlaceData(pickedCuisine);
    moveUnderline();
    $('#foodButton').on('click', geoLocateCall);    
    pickedCuisine = pickRandomLocation(locations);    
}

function removeElements() {
    $('#weatherBox').css('display', 'flex');
    $('#firstPage').css('display', 'flex');
    $('.carousel').addClass('hidden');
    $('.clock').removeClass('clockHide').css('display', 'inline-block');
    //Removes black background when going back a page
    $('.navContainer').css({
        "background-color": "",
        "border-bottom": ""
    });
    $('.returnButton, .row, #googleMaps, .yelpButton, .returnButtonContainer, .mapsContainer').remove();
    $('#foodButton').on('click', geoLocateCall);    
    moveUnderline();    
}

/***************************************************************************************************
 * weatherSpinner - creates spinning icon while ajax call for getting current weather is running
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */
function weatherSpinner() {
    var iDiv = $('<i>').addClass('weatherSpinner fa fa-circle-o-notch fa-spin fa-lg fa-fw');
    $('#weatherBox').append(iDiv);
}

/***************************************************************************************************
 * yelpButton - opens new tab to go to current resturant yelp page
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */

function yelpButton() {
    window.open(yelpURL);
}