var locations = [{
        title: 'The United States',
        imgSrc: './images/America.jpg',
        foodType: 'American'
    },
    {
        title: 'China',
        imgSrc: './images/China.jpg',
        foodType: 'Chinese'
    },
    {
        title: 'Cuba',
        imgSrc: './images/Cuba.jpg',
        foodType: 'Cuban'
    },
    {
        title: 'France',
        imgSrc: './images/France.jpg',
        foodType: 'French'
    },
    {
        title: 'Germany',
        imgSrc: './images/Germany.jpg',
        foodType: 'German'
    },
    {
        title: 'Greece',
        imgSrc: './images/Greece.jpg',
        foodType: 'Greek'
    },
    {
        title: 'Hawaii',
        imgSrc: './images/Hawaii.jpg',
        foodType: 'Hawaiian'
    },
    {
        title: 'India',
        imgSrc: './images/India.jpg',
        foodType: 'Indian'
    },
    {
        title: 'Iran',
        imgSrc: './images/Iran.jpg',
        foodType: 'Iranian'
    },
    {
        title: 'Italy',
        imgSrc: './images/Italy.jpg',
        foodType: 'Italian'
    },
    {
        title: 'Japan',
        imgSrc: './images/Japan.jpg',
        foodType: 'Japanese'
    },
    {
        title: 'Korea',
        imgSrc: './images/Korea.jpg',
        foodType: 'Korean'
    },
    {
        title: 'Mexico',
        imgSrc: './images/Mexico.jpg',
        foodType: 'Mexican'
    },
    {
        title: 'Peru',
        imgSrc: './images/Peru.jpg',
        foodType: 'Peruvian'
    },
    {
        title: 'The Philippines',
        imgSrc: './images/Philippines.jpg',
        foodType: 'filipino'
    },
    {
        title: 'Thailand',
        imgSrc: './images/Thailand.jpg',
        foodType: 'thai'
    },
    {
        title: 'Vietnam',
        imgSrc: './images/Vietnam.jpeg',
        foodType: 'vietnamese'
    },
];

/***************************************************************************************************
 * geoLocateCall - calls the Google geolocation API
 * @param: {none}
 * @returns: {none}
 * @calls: Google geolocation API
 */
function geoLocateCall() {
    $('body').addClass('hideOverflow');
    $('#firstPage').fadeOut(750);
    $('.clock').addClass('clockHide');
    $('.clockHide, #weatherBox, .logo').fadeOut(750);
    $('#foodButton').unbind();
    $('.cs-loader').show();
    $.ajax({
        dataType: 'json',
        method: 'post',
        wifiAccessPoints: [],
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD2P0kN9ffis_AOZUH5jrHNYdwQ6oU7wI4',
        success: function (result) {
            userLocation_result = result.location;
            yelpCall();
        }
    });

}

/***************************************************************************************************
 * newLocation - Gets current time and dynamically creates div onto main page
 * @param: {title, src, food} - strings
 * @returns: {none}
 * @calls: {none}
 */

function newLocation(title, src, food) {
    var newPlace = {};
    newPlace.title = title;
    newPlace.imgSrc = src;
    newPlace.foodType = food;
    locations.push(newPlace);
}

/***************************************************************************************************
 * pickAnotherCountry - 
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */
function pickAnotherCountry() {
    pickedCuisine = pickRandomLocation(locations);
    removeElements();
    putPickedPlaceData(pickedCuisine);
}

/***************************************************************************************************
 * putPickedPlaceData - Adds randomly selected location to DOM
 * @param: {pickedPlace} Takes in randomly selected place
 * @returns: {none}
 * @calls:
 */

function putPickedPlaceData(pickedPlace) {
    $('#location').text(pickedPlace.title);
    $('body').css("background", "url('" + pickedPlace.imgSrc + "') no-repeat fixed");
}

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