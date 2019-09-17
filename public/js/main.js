//Get show data from events.js:
var gigInfo = data.concerts;


//Initialize Vue.js:
var app = new Vue({
    el: "#app",

    data: {
        dataForTable: [],

    },

    created: function () {
        this.getData();
        console.log(this.dataForTable);

    },



    methods: {

        getData: function () {
            for (var i = 0; i < gigInfo.length; i++) {
                this.dataForTable.push(gigInfo[i]);
            }
        },


        sortingTheDataByBand: function () {

            this.dataForTable = [...gigInfo].sort(function (a, b) {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            })
        },

        sortingTheDataByDate: function () {

            this.dataForTable = [...gigInfo].sort(function (a, b) {
                if (a.band < b.band) {
                    return -1;
                }
                if (a.band > b.band) {
                    return 1;
                }
                return 0;
            })
        },

        sortingTheDataByCountry: function () {

            this.dataForTable = [...gigInfo].sort(function (a, b) {
                if (a.country < b.country) {
                    return -1;
                }
                if (a.country > b.country) {
                    return 1;
                }
                return 0;
            })
        }

    },
});



//Scroll To Top Button:
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
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


//Collapsible:
var coll = document.getElementsByClassName("collapsible");


for (var i = 0; i < coll.length; i++) {



    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;

        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });


};

//Get elements:
var tableHeaderBand = document.getElementById("headerBand");
var tableHeaderDate = document.getElementById("headerDate");
var tableHeaderCountry = document.getElementById("headerCountry");

//Event listeners for header:
tableHeaderBand.addEventListener("click", function () {
    console.log("You clicked the band header");
});
tableHeaderDate.addEventListener("click", function () {
    console.log("You clicked the date header");
});
tableHeaderCountry.addEventListener("click", function () {
    console.log("You clicked the country header");
});