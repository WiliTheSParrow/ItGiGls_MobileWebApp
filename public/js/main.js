//Get data from events.js
var gigInfo = data.concerts;

//Initialize Vue.js
var app = new Vue({
    el: "#app",

    data: {
        dataForTable: [],
        collapseMenuPath: false,
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

        login: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function () {
                app.getPosts();
            })
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


