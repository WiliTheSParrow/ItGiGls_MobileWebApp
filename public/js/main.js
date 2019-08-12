console.log("hello it is me");
var gigInfo = data.concerts;
console.log(gigInfo);
console.log(gigInfo[0].band);

var app = new Vue({
    el: "#app",

    data: {
        listOfBands: [],
        dateOfGigs: [],
        listOfCountries: []
    },

    created: function () {
        if (location.pathname == "/index.html") {
            this.getData();
            
        }
        console.log("hello it is me again");
        console.log(this.listOfBands);
        

    },



    methods: {
        getData: function () {
            for (var i = 0; i < this.gigInfo.length; i++) {
                if (gigInfo[i].band == true){
                this.listOfBands.push(this.gigInfo[i].band);
                return this.listOfBands;
            }}
            
        }
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