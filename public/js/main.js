var gigInfo = data.concerts;

console.log(gigInfo);


var app = new Vue({
    el: "#app",

    data: {
        listOfBands: [],
        dateOfGigs: [],
        listOfCountries: []
    },

    

    

});



//Scroll To Top Button:
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#topBtn').fadeIn();
        } else {
            $('#topBtn').fadeOut();
        }
    });

    $("#topBtn").click(function () {
        $('html , body').animate({
            scrollTop: 0
        }, 800);
    });
});