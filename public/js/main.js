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

        /* sortDataByBand: function (valami1) {
            var orderToUse = '';
            this.dataForTable = this.gigInfo.sort(
                function (a, b) {
                    if (app.currentBandOrder == 'mixed' || app.currentBandOrder == 'descending') {
                        orderToUse = 'ascending';
                        app.visualizeTableArrow(this.arrowDownBand, this.arrowUpBand);
                        if (a.band < b.band) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        orderToUse = 'descending';
                        app.visualizeTableArrow(this.arrowUpBand, this.arrowDownBand);
                        if (a.band < b.band) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            );
            app.currentBandOrder = orderToUse;
           
        }, */
        /* sortDataByDate: function () {
            var orderToUse = '';
            this.dataForTable = this.gigInfo.sort(
                function (a, b) {
                    if (app.currentBandOrder == 'order1' || app.currentBandOrder == 'order3') {
                        orderToUse = 'order2';
                        app.visualizeTableArrow(this.arrowDownDate, this.arrowUpDate);
                        if (a.date < b.date) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        orderToUse = 'order3';
                        app.visualizeTableArrow(this.arrowUpDate, this.arrowDownDate);
                        if (a.date < b.date) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            );
            app.currentBandOrder = orderToUse;
        }, */
        /* sortDataByCountry: function () {
            var orderToUse = '';
            this.dataForTable = this.gigInfo.sort(
                function (a, b) {
                    if (app.currentBandOrder == 'mixed' || app.currentBandOrder == 'descending') {
                        orderToUse = 'ascending';
                        app.visualizeTableArrow(this.arrowDownCountry, this.arrowUpCountry);
                        if (a.country < b.country) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        orderToUse = 'descending';
                        app.visualizeTableArrow(this.arrowUpCountry, this.arrowDownCountry);
                        if (a.country < b.country) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            );
            app.currentBandOrder = orderToUse;
        }, */

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

        toggleBandInfos: function () {
            var accordionTitle = document.getElementsByClassName('accordion-section-title');
            console.log(accordionTitle);
            for (var i = 0; i < accordionTitle.length; i++) {
                console.log(accordionTitle[i]);
                var accordionPanel=accordionTitle[i].nextElementSibling;
                console.log(accordionPanel);

                if (accordionPanel.style.display === 'block') {
                    accordionPanel.style.display = "none";
                } else {
                    accordionPanel.style.display = "block";
                };
            };
             

            


        }

        /* collapse: function () {
            console.log("A vjúbó vagyok");


            if (accordionSectionTitle.classList.contains('active')) {

                console.log("Az else-ből vagyok, aktív");
                accordionSectionTitle.removeClass('active');
                accordionSectionContent.slideUp(300).removeClass('open');

            } else {


                console.log("Az if-ből vagyok, nem aktív");
                accordionSectionTitle.addClass('active');
                accordionSectionContent.slideDown(300).addClass('open');
            }
        } */


    }
});

//Scroll To Top Button:
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


//Collapsible id generator:
$(document).ready(function () {
    var i = 0;
    $('.accordion-section-content').each(function () {
        $(this).attr('id', "chSelect" + i);
        i++;
    });
});
$(document).ready(function () {
    var i = 0;
    $('.accordion-section-title').each(function () {
        $(this).attr('href', "#chSelect" + i);
        i++;
    });
});

// Accordion:
/* $(document).ready(function () {
    // Closing function:
    function close_accordion_section() {
        console.log("bezárok");
        $('.accordion-section-title').removeClass('active');
        $('.accordion-section-content').slideUp(300).removeClass('open');

    };

    $('.accordion-section-title').click(function (e) {

        if ($(e.target).is('.active')) {
            console.log("aktív vagyok");
            close_accordion_section();

        } else {
            console.log("no aktív");
            close_accordion_section();
            var currentAttrValue = $(this).attr('href');
            $(this).addClass('active');
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');

        }

        e.preventDefault();
    });
}); */

// ACCORDION TEST START
/* $(document).ready(function () {
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }

    $('.accordion-section-title').click(function (e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');

        if ($(e.target).is('.active')) {
            close_accordion_section();
        } else {
            close_accordion_section();

            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }

        e.preventDefault();
    });
}); */
// ACCORDION TEST END