var yelpName;
var yelpPicture;
var yelpAddress;
var yelpInfo;
var yelpOpen;
var yelpReviewCount;
var yelpBusinessId;


/***************************************************************************************************
 * yelpCall - Uses Yelp API to get response data from a search based on the random country selected on main page
 * @param: {none}
 * @returns: {none}
 * @calls: {randomizeBusiness(response), displayYelp}
 */

function yelpCall() {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var yelpApi = 'https://api.yelp.com/v3/businesses/search?term=' + pickedCuisine.foodType + '&latitude=' + userLocation_result.lat +'&longitude=' + userLocation_result.lng +'&Authorization=Bearer N6_WFXHCeAWzeFBJvljs8lgptMrgkJoakrMe8wiS04dihDrsNiFWu4rWc1_5X7HzcV-tbq9L2lUOQ5qPNYloCRoexh57VDFuaaVG7p3MnlQEQ1bG59HP3vqSoSLcWXYx';
    var businessUrl = 'https://api.yelp.com/v3/businesses/';
    $.when(
        $.ajax({
            dataType: 'json',
            method: 'get',
            url: proxy + yelpApi,
            headers: {Authorization: 'Bearer N6_WFXHCeAWzeFBJvljs8lgptMrgkJoakrMe8wiS04dihDrsNiFWu4rWc1_5X7HzcV-tbq9L2lUOQ5qPNYloCRoexh57VDFuaaVG7p3MnlQEQ1bG59HP3vqSoSLcWXYx'},
            success: function (response) {
                console.log('Yelp response worked', response);
                randomizeBusiness(response);
                displayYelp();
                $('body').removeClass('hideOverflow');
                $('.clock, #weatherBox').css('display', 'none');
            }
        })).then(function() {
            $.ajax({
                dataType: 'json',
                method: 'get',
                url: proxy + businessUrl,
                headers: {Authorization: 'Bearer N6_WFXHCeAWzeFBJvljs8lgptMrgkJoakrMe8wiS04dihDrsNiFWu4rWc1_5X7HzcV-tbq9L2lUOQ5qPNYloCRoexh57VDFuaaVG7p3MnlQEQ1bG59HP3vqSoSLcWXYx'},                
                success: function(response) {
                    console.log('Business info', response);
                }
            })
        })
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
    console.log('Random business pick was', pickedBusiness);
    yelpBusinessId = pickedBusiness.id;
    yelpPicture = pickedBusiness.image_url;
    yelpName = pickedBusiness.name;
    yelpReviewCount = pickedBusiness.review_count;
    yelpOpen = pickedBusiness.is_closed;
    var addressLine1 = pickedBusiness.location.display_address[0];
    if (pickedBusiness.location.display_address.length == 3) {
        addressLine1 += ' ' + pickedBusiness.location.display_address[1];
    }
    if (pickedBusiness.location.display_address.length > 1) {
        var addressLine2 = pickedBusiness.location.display_address[pickedBusiness.location.display_address.length-1];
    }
    yelpAddress = addressLine1 + '</br>' + addressLine2;
    yelpInfo = pickedBusiness;
}

/***************************************************************************************************
 * displayYelp - After button on first page is clicked, creates divs to append on screen
 * @param: {none}
 * @returns: {none}
 * @calls: {yelpAppear}
 */

function displayYelp() {
    $('#firstPage').fadeOut(500);
        function yelpAppear(){
            var returnButton = $('<button>').addClass('col-xs-12 btn btn-primary returnButton').text('Try Another Country');            
            var googleMaps = $('<div>').attr('id','googleMaps').addClass('col-xs-12 col-sm-12 col-md-12');
            var row = $('<div>').addClass('row');
            var yelpInfo = $('<div>').attr('id','yelpInfo').addClass('col-xs-12 col-sm-5 col-md-5');
            var pictureBox = $('<div>').attr('id','yelpPicture').addClass('col-xs-12 col-sm-5 col-md-5');
            var foodPicture =$('<img>').attr('src',yelpPicture).attr('id','food');
            $(row).append(pictureBox, yelpInfo);
            $('#mainPage').append(row);
            $('#yelpPicture').append(foodPicture);
            $('#mainPage').append(googleMaps, returnButton);
            addDescription();
        }
    $('.cs-loader').hide();
    setTimeout(yelpAppear,500);
    setTimeout(initMap,500);
}

/***************************************************************************************************
 * addDescription - Appends all info of randomly picked business
 * @param: {none}
 * @returns: {none}
 * @calls: {none}
 */

function addDescription(){
    var $businessName = $('<div>').attr('id','businessName');
    var $businessAddress = $('<div>').attr('id', 'businessAddress');
    var $businessPhone = $('<div>').attr('id', 'businessPhone');
    var $stars = $('<img>').attr({'id': 'starRating', 'src': 'images/'+ yelpInfo.rating+ 'star.png'});    
    var starContainer = $('<div>').addClass('starContainer');
    var reviewCount = $('<div>').addClass('reviewCount').text(yelpReviewCount + ' Reviews');
    var storeOpen = yelpOpen ? 'Open' : '';
    var storeOpenDiv = $('<div>').text(storeOpen).addClass(storeOpen);
    starContainer.append($stars, reviewCount);
    $businessName.text(yelpName);
    $businessAddress.html(yelpAddress);
    $businessPhone.text(yelpInfo.display_phone);
    var $goToYelpButton = $('<button>', {
        class: 'btn btn-success',
        attr: {'id': 'goToYelp'},
        click: directToYelp,
        text: 'Check Out On Yelp!'
    });
    $('#food').attr('src',yelpPicture);
    $('#yelpInfo').append($businessName, starContainer, $businessPhone, storeOpenDiv, $businessAddress, $goToYelpButton);
}

/***************************************************************************************************
 * directionToYelp - opens and post google maps with direction from current location to restaurant
 * @param: {none}
 * @returns: {none}
 * @calls: {none}
 */

function directToYelp() {
    window.open(yelpInfo.url);
}