console.log("hello it is me");

var gigInfo = data.concerts;

console.log(gigInfo);


var app = new Vue({
    el: "#app",

    data: {
        listOfBands: [],
        dateOfGigs: [],
        listOfCountries: []
    },

    created: function(){
        if (location.pathname=="/index.html"){
            app.getData();
        }
        
    },

    

    methods:{
        getData: function (){
            for (var i = 0; i < gigInfo.length;i++){
                if (gigInfo[i] == "band"){
                    app.listOfBands.push(gigInfo[i]);
                    console.log(app.listOfBands);
                };

            }
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