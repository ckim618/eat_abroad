var businessUrl;
var yelpName;
var yelpPicture1;
var yelpPicture2;
var yelpPicture3;
var yelpAddress;
var yelpInfo;
var yelpURL;
var yelpReviewCount;
var yelpBusinessId;


/***************************************************************************************************
 * directionToYelp - opens and post google maps with direction from current location to restaurant
 * @param: {none}
 * @returns: {none}
 * @calls: {none}
 */

function directToYelp() {
    window.open(yelpInfo.url);
}


/***************************************************************************************************
 * displayYelp - After button on first page is clicked, creates divs to append on screen
 * @param: {response}
 * @returns: {none}
 * @calls: {yelpAppear, addDescription}
 */

function displayYelp(response) {
    var yelpPhoto = response.photos;
    var yelpPhone = response.display_phone;
    yelpPicture1 = yelpPhoto[0];
    yelpPicture2 = yelpPhoto[1];
    yelpPicture3 = yelpPhoto[2];

    $('#firstPage').fadeOut(500);
    $('.cs-loader').hide();
    $('.logo, #weatherBox').show();

    function yelpAppear() {
        var googleMapsContainer = $('<div>').addClass('mapsContainer');
        var googleMaps = $('<div>').attr('id', 'googleMaps');
        var completedMapsContainer = $(googleMapsContainer).append(googleMaps);
        var returnButtonContainer = $('<div>').addClass('returnButtonContainer');
        var returnButton = $('<h3>').text('Try Another Country').addClass('returnButton');
        var yelpButton = $('<h3>').text('Check Out On Yelp').addClass('yelpButton');
        var completedReturnButton = $(returnButtonContainer).append(returnButton, yelpButton);
        $('.hideButton').removeClass('hideButton');
        $('.carousel').removeClass('hidden');
        $('.yelpPic1').attr('src', yelpPicture1);
        $('.yelpText').text(yelpName);
        $('.yelpStar1').attr({
            'id': 'starRating',
            'src': 'images/' + yelpInfo.rating + 'star.png'
        });
        $('.yelpReview1').addClass('reviewCount').text(yelpReviewCount + ' Reviews');
        $('.yelpPic2').attr('src', yelpPicture2);
        $('.yelpAddress').text(yelpAddress);
        $('.yelpPic3').attr('src', yelpPicture3);
        $('.yelpPhone').text('Phone: ' + yelpPhone);
        $('.navContainer').css({
            "background-color": "black",
            "border-bottom": "3px solid white",
            "width": "100%",
            "height": "60px"
        });
        $('#mainPage').append(completedMapsContainer, completedReturnButton);
    }

    setTimeout(yelpAppear, 500);
    setTimeout(initMap, 500);
}

/***************************************************************************************************
 * randomizeBusiness - Picks a random business from result of API search
 * @param: {response}
 * @returns: {none}
 * @calls: {none}
 */

function randomizeBusiness(response) {
    var randomIndex = Math.floor(Math.random() * 6);
    var pickedBusiness = response.businesses[randomIndex];
    var key = 'Bearer F2KCtecYPBzx2FMjRUtHusXo5gthr7cXponRHi3mFdDty8K3BliD-Cn09sMR5tP2i5SD9kB8U3z7DOxq_5XMgbv24jGzCUgPDALtD6qrU0WHJOUXaMuAdsEiruJOWnYx';
    var addressLine1 = pickedBusiness.location.display_address[0];

    yelpBusinessId = pickedBusiness.id;
    yelpName = pickedBusiness.name;
    yelpReviewCount = pickedBusiness.review_count;
    yelpURL = pickedBusiness.url;
    if (pickedBusiness.location.display_address.length == 3) {
        addressLine1 += ' ' + pickedBusiness.location.display_address[1];
    }
    if (pickedBusiness.location.display_address.length > 1) {
        var addressLine2 = pickedBusiness.location.display_address[pickedBusiness.location.display_address.length - 1];
    }
    yelpAddress = addressLine1 + ' ' + addressLine2;
    yelpInfo = pickedBusiness;
    businessUrl = 'https://api.yelp.com/v3/businesses/' + yelpBusinessId + '?Authorization=' + key;
}


/***************************************************************************************************
 * yelpCall - Uses Yelp API to get response data from a search based on the random country selected on main page
 * @param: {none}
 * @returns: {none}
 * @calls: {randomizeBusiness(response), displayYelp}
 */

function yelpCall() {
    var key = 'Bearer F2KCtecYPBzx2FMjRUtHusXo5gthr7cXponRHi3mFdDty8K3BliD-Cn09sMR5tP2i5SD9kB8U3z7DOxq_5XMgbv24jGzCUgPDALtD6qrU0WHJOUXaMuAdsEiruJOWnYx';
    var proxy = 'http://thingproxy.freeboard.io/fetch/';
    var yelpApi = 'https://api.yelp.com/v3/businesses/search?term=' + pickedCuisine.foodType + '&latitude=' + userLocation_result.lat + '&longitude=' + userLocation_result.lng + '&Authorization=' + key;
    $.when(
        $.ajax({
            dataType: 'json',
            method: 'get',
            url: proxy + yelpApi,
            headers: {
                Authorization: key
            },
            success: function (response) {
                randomizeBusiness(response);
                $('body').removeClass('hideOverflow');
                $('.clock, #weatherBox').hide();
            },
            error: function () {
                $('.cs-loader').hide();
                setTimeout(function () {
                    alert('Yelp Failed Please Refresh Page');
                }, 2000);
            }
        })).then(function () {
        $.ajax({
            dataType: 'json',
            method: 'get',
            url: proxy + businessUrl,
            headers: {
                Authorization: key
            },
            success: function (response) {
                displayYelp(response);
            }
        });
    });
}