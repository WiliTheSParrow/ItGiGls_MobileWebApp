//Get show data from events.js:
var gigInfo = data.concerts;


//Initialize Vue.js:
var app = new Vue({
    el: "#app",

    data: {
        dataForTable: [],

    },

    created: function () {
        this.getGigData();
		this.getData("");
		firebase.auth().onAuthStateChanged(function (user) {
			if (user != null) {
				this.loggedIn = true;
				app.getPosts();
			} else {
				this.loggedIn = false;
			}
		});
    },



    methods: {
        getData: function (url) {
			fetch(url, {
					method: "GET"
				})
				.then(function (response) {
					return response.json()
				})
				.catch(function (error) {
					console.log(error)
				});
		},

        getGigData: function () {
            for (var i = 0; i < gigInfo.length; i++) {
                this.dataForTable.push(gigInfo[i]);
            }

            
        },


        sortingTheDataByBand: function () {
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

        sortingTheDataByDate: function () {
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
        },


        loginWithGoogle: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function () {
                app.getPosts();
            });
           /*  .catch(function () {
                alert("Something went wrong...");
            }); */
        },

        getPosts: function(){

        /* Cicmo
        getPosts: function () {
            firebase.database().ref('myMatch').on('value', function (data) {
                app.posts = data.val();
            });        },

        Jae
        getPosts: function () {
			app.loggedIn = true;
			app.currentUser = firebase.auth().currentUser.email;
			firebase.database().ref('chat1').on('value', function (data) {
				app.conversations = data.val();
				$(".textArea").animate({
					scrollTop: $(".textArea").prop("scrollHeight")
				}, 700);
			})
		},

        */
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