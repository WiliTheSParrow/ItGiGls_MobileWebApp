var gigInfo = data.concerts;
/* var accordionSectionTitle = document.getElementsByClassName('accordion-section-title');
var accordionSectionContent = document.getElementsByClassName('accordion-section-content'); */
var app = new Vue({
    el: "#app",

    data: {
        dataForTable: [],
        currentUser: '',
        loggedIn: '',
        isActive: "hide",
        posts: {},
        hidegif: true,
        sortingBookmark: true
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
            for (var i = 0; i < gigInfo.length; i++) {
                this.dataForTable.push(gigInfo[i]);
            };

            this.hidegif = false;

        },

        sortingTheDataByBand: function () {
            console.log(this.sortingBookmark);
            this.dataForTable = [...gigInfo].sort(function (a, b) {
                if (this.sortingBookmark=true) {
                    if (a.band < b.band) {
                        return -1;
                    }
                    app.sortingBookmark = false;
                    console.log("lefutok a-bol b-be");
                } else {
                    if (a.band > b.band) {
                        return 1;
                    }
                    app.sortingBookmark = true;
                    console.log("lefutok b-bol a-ba");
                }
                console.log("lefutok");
            })

            console.log(this.sortingBookmark);

            /*fgv, ami semmi mast nem fog csinalni csak azt, hogz a sorting data return ertekeit 
            felveszi parameternek es egy ennek megfelelo string valtozoval visszater, ezt a string 
            valtozot hozzuk letre fenn a vue instance-ben, o mondja meg, hogy a legutolso sorting eredmenye mi volt. 
            Ezt a sorting string valtozot minden egyes sorting fgv meghivasakor megvizsgaljuk es ehhez kotjuk azt, 
            hogy a meghivott sorting fgv-unk milyen iranzyba sortingoljon
            .
            .
            Adam hulye volt, nem kell kulon funct. egz return kell, ide alam
            szoval a leguccso sortingot irja felul es azzal terjen vissza*/


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


//Collapsible:
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
$(document).ready(function () {
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
});
// ACCORDION TEST END