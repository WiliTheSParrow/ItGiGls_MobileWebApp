var gigInfo = data.concerts;

var app = new Vue({
    el: "#app",

    data: {
        dataForTable: [],
    },

    created: function () {
        this.getData();
    },



    methods: {
        getData: function () {
            for (var i = 0; i < gigInfo.length; i++) {
                this.dataForTable.push(gigInfo[i]);
            }
        },

        collapse: function(){
            
        }
    }
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
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
};