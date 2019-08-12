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
        this.getData();
        console.log("hello it is me again");
        console.log(this.listOfBands);
        console.log(this.dateOfGigs);
        console.log(this.listOfCountries);
    },



    methods: {
        getData: function () {
            for (var i = 0; i < gigInfo.length; i++) {
                this.listOfBands.push(gigInfo[i].band);
                this.dateOfGigs.push(gigInfo[i].date);
                this.listOfCountries.push(gigInfo[i].country);
            }
        }
    }
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