/***************************************************************************************************
 * currentWeatherLocation - Gathers location of user latitude and longitude and stores in global variable 
 * @param: {none}
 * @returns: {none}
 * @calls: 
 */

function currentWeatherLocation() {
    $.ajax({
        dataType: 'json',
        method: 'post',
        wifiAccessPoints: [],
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD2P0kN9ffis_AOZUH5jrHNYdwQ6oU7wI4',
        success: function (result) {
            weatherLatitude = result.location.lat;
            weatherLongitude = result.location.lng;
        }
    });
}


/***************************************************************************************************
 * currentWeather - calls weather API and and appends to DOM
 * @param: {none}
 * @returns: {none}
 * @calls: {darksky API, skycons}
 */

function currentWeather() {
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var weatherAPI = 'https://api.darksky.net/forecast/40db894f8893c02949d84e53158e3c92/' + weatherLatitude + ',' + weatherLongitude;
    var key = 'AIzaSyD2P0kN9ffis_AOZUH5jrHNYdwQ6oU7wI4';
    weatherSpinner();
    $.when($.ajax({
        dataType: 'json',
        method: 'get',
        url: proxy + weatherAPI,
        success: function (result) {
            console.log('weather', result)
            currentUserWeather = result;
            var currentTemp = currentUserWeather.currently.apparentTemperature;
            $('#weatherBox').text(parseInt(currentTemp) + String.fromCharCode(176));
        },
        error: function () {
            var weatherError = $('<div>').text('- -°').addClass('errorWeather');
            $('.weatherSpinner').remove();
            $('#weatherBox').append(weatherError);
        }
    })).then(function () {
        $.ajax({
            dataType: 'json',
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + weatherLatitude + ',' + weatherLongitude + '&key=' + key,
            success: function (result) {
                console.log('google geocode', result);
                var city = result.results[0].address_components[3].long_name;
                var state = result.results[0].address_components[5].short_name;
                var cityDiv = $('<div>').text(city + ', ' + state).addClass('cityName');
                $('#weatherBox').append(cityDiv);
            }
        })
    })
}