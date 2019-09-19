//Get show data from events.js:
var gigInfo = data.concerts;


//Initialize Vue.js:
var app = new Vue({
    el: "#app",

    data: {
        dataForTable: [],
        currentUser: '',
		loggedIn: '',
    },

    created: function () {
        this.getGigData();
		// this.getData("");
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
        /* getData: function (url) {
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
 */
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


        login: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function () {
                this.getPosts();
            });
           /*  .catch(function () {
                alert("Something went wrong...");
            }); */
        },

        logout: function () {
			firebase.auth().signOut();
			this.loggedIn = false;
        },
        
        writeNewPost: function (chat1) {

			var text = document.getElementById("textInput").value;
			var name = firebase.auth().currentUser.displayName;
			var img = firebase.auth().currentUser.photoURL;
			var mail = firebase.auth().currentUser.email;
			var date = new Date();
			var timetoString = String(date);
			var sliceTime = timetoString.slice(0, 21);

			var post = {
				name: name,
				body: text,
				image: img,
				email: mail,
				creationTime: sliceTime
			};
             // Get a key for a new Post.
			var newPostKey = firebase.database().ref().child('chat1').push().key;
			var updates = {};
			updates[newPostKey] = post;
			$("#textInput").val("");
			return firebase.database().ref('chat1').update(updates);
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