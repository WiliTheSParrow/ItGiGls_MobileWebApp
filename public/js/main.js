var app = new Vue({
    el: "#app",
    data: {
        gigInfo: concertData.concerts,
        dataForTable: [],
        currentUser: '',
        loggedIn: '',
        isActive: "hide",
        posts: {},
        hidegif: true,
        currentBandOrder: "mixed",
        currentArrowStatus: "both"
    },
    created: function () {
        this.getGigData();
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
        toggleClass: function (value) {
            if (this.isActive != value) {
                this.isActive = value;
            } else {
                this.isActive = "hide";
            }
        },
        getGigData: function () {
            for (var i = 0; i < this.gigInfo.length; i++) {
                this.dataForTable.push(this.gigInfo[i]);
            };
            this.hidegif = false;
        },
        visualizeTableArrow: function (arrow1, arrow2) {
            var showArrow = document.getElementById(arrow1);
            var hideArrow = document.getElementById(arrow2);
            var orderToUse = '';
            if (app.currentArrowStatus == 'both' || app.currentArrowStatus == 'down') {
                orderToUse = 'up';
                hideArrow.style.display = 'none';
                showArrow.style.display = 'inline-block'
            } else {
                orderToUse = 'down';
                showArrow.style.display = 'none';
                hideArrow.style.display = 'inline-block'
            }
            app.currentArrowStatus = orderToUse;
        },
        sortDataInTable: function (category, arrow1, arrow2) {
            var orderToUse = '';
            this.dataForTable = this.gigInfo.sort(
                function (a, b) {
                    if (app.currentBandOrder == 'mixed' || app.currentBandOrder == 'descending') {
                        orderToUse = 'ascending';
                        if (a[category] < b[category]) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        orderToUse = 'descending';
                        if (a[category] < b[category]) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            );
            app.currentBandOrder = orderToUse;
        },
        login: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function () {
                app.getPosts();
            });
            app.loggedIn = true;
        },
        logout: function () {
            firebase.auth().signOut();
            app.loggedIn = false;
        },
        writeNewPost: function (giglchat) {
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
            var newPostKey = firebase.database().ref().child('giglchat').push().key;
            var updates = {};
            updates[newPostKey] = post;
            $("#textInput").val("");
            return firebase.database().ref('giglchat').update(updates);
        },
        getPosts: function () {
            app.loggedIn = true;
            app.currentUser = firebase.auth().currentUser.email;
            firebase.database().ref('giglchat').on('value', function (data) {
                app.posts = data.val();
                $(".chatlogs").animate({
                    scrollTop: $(".chatlogs").prop("scrollHeight")
                }, 700);
            })
        },
        toggleBandInfo: function (key) {
            var accordionTitle = document.getElementById(key);
            var accordionContent = accordionTitle.nextElementSibling;

            if (accordionContent.style.maxHeight == "") {
                for (var i = 0; i < this.dataForTable.length; i++) {
                    var everythingElse = document.getElementById(i);
                    var everythingElseContent = everythingElse.nextElementSibling;
                    everythingElseContent.style.maxHeight = null;
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                }
            } else if (accordionContent.style.maxHeight == accordionContent.scrollHeight + 'px') {
                accordionContent.style.maxHeight = null;
            }
        }
    }
});
//Scroll To Top Button function:
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('#footerTopBtn').fadeIn();
        } else {
            $('#footerTopBtn').fadeOut();
        }
    });

    $('#footerTopBtn').click(function () {
        $('html , body').animate({
            scrollTop: 0
        }, 100);
    });
});