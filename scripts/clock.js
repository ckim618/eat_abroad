/***************************************************************************************************
 * startTime - Gets current time and dynamically creates div onto main page
 * @param: {none}
 * @returns: {none}
 * @calls: {none}
 */

$(document).ready(function startTime() {
    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    minute = checkTime(minute);
    second = checkTime(second);
    $('.clock').text(hour + ":" + minute + ":" + second);
    setTimeout(startTime, 500);

    /***************************************************************************************************
     * checkTime - Checks if the seconds is less than 10 and adds 0 in front of number
     * @param: {i}
     * @returns: {i} returns a 0 in front of any number less than 10 in seconds of clock
     * @calls: {none}
     */

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i;
    }
});
