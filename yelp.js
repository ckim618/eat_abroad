var businessUrl;
var yelpName;
var yelpPicture1;
var yelpPicture2;
var yelpPicture3;
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
    var key = 'Bearer N6_WFXHCeAWzeFBJvljs8lgptMrgkJoakrMe8wiS04dihDrsNiFWu4rWc1_5X7HzcV-tbq9L2lUOQ5qPNYloCRoexh57VDFuaaVG7p3MnlQEQ1bG59HP3vqSoSLcWXYx';
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var yelpApi = 'https://api.yelp.com/v3/businesses/search?term=' + pickedCuisine.foodType + '&latitude=' + userLocation_result.lat +'&longitude=' + userLocation_result.lng +'&Authorization='+key;
    $.when(
        $.ajax({
            dataType: 'json',
            method: 'get',
            url: proxy + yelpApi,
            headers: {Authorization: key},
            success: function (response) {
                console.log('Yelp response worked', response);
                randomizeBusiness(response);
                $('body').removeClass('hideOverflow');
                $('.clock, #weatherBox').css('display', 'none');
            }
        })).then(function() {
            $.ajax({
                dataType: 'json',
                method: 'get',
                url: proxy + businessUrl,
                headers: {Authorization: key},                
                success: function(response) {
                    displayYelp(response);                    
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
    yelpAddress = addressLine1 + ' ' + addressLine2;
    yelpInfo = pickedBusiness;
    businessUrl = 'https://api.yelp.com/v3/businesses/'+yelpBusinessId+'?Authorization=Bearer F2KCtecYPBzx2FMjRUtHusXo5gthr7cXponRHi3mFdDty8K3BliD-Cn09sMR5tP2i5SD9kB8U3z7DOxq_5XMgbv24jGzCUgPDALtD6qrU0WHJOUXaMuAdsEiruJOWnYx';    
}

/***************************************************************************************************
 * displayYelp - After button on first page is clicked, creates divs to append on screen
 * @param: {response}
 * @returns: {none}
 * @calls: {yelpAppear, addDescription}
 */

function displayYelp(response) {
    console.log('Display to yelp response', response);
    var yelpPhoto = response.photos;
    var yelpPhone = response.display_phone;
    var picClass = 'picThirds col-md-3 col-sm-3 col-xs-12';
    yelpPicture1 = yelpPhoto[0];
    yelpPicture2 = yelpPhoto[1];
    yelpPicture3 = yelpPhoto[2];

    $('#firstPage').fadeOut(500);
        function yelpAppear(){
            var googleMaps = $('<div>').attr('id','googleMaps');
            $('.carousel').removeClass('hidden');
            $('.yelpPic1').attr('src', yelpPicture1);
            $('.yelpText1').text(yelpName); 
            $('.yelpStar1').attr({'id': 'starRating', 'src': 'images/'+ yelpInfo.rating+ 'star.png'});
            $('.yelpReview1').addClass('reviewCount').text(yelpReviewCount + ' Reviews');            
            $('.yelpPic2').attr('src', yelpPicture2);
            $('.yelpPhone').text('Phone: ' + yelpPhone);
            $('.yelpPic3').attr('src', yelpPicture3);
            $('.yelpAddress').text(yelpAddress);            
            $('#mainPage').append(googleMaps); 
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
    var businessContainer = $('<div>').addClass('businessContainer');
    var completedBusinessContainer = $(businessContainer).append($businessName, starContainer, $businessPhone, $businessAddress, $goToYelpButton);
    
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
    $('#googleMaps').append(completedBusinessContainer);
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


// var returnButton = $('<button>').addClass('col-xs-12 btn btn-primary returnButton').text('Try Another Country');            
// // var googleMaps = $('<div>').attr('id','googleMaps').addClass('col-xs-12 col-sm-12 col-md-12');
// // var row = $('<div>').addClass('row');
// // var yelpInfo = $('<div>').attr('id','yelpInfo').addClass('col-xs-12 col-sm-5 col-md-5');
// // var pictureBox = $('<div>').attr('id','yelpPicture').addClass('col-xs-12 col-sm-5 col-md-5');
// // var foodPicture =$('<img>').attr('src',yelpPicture1).attr('id','food');