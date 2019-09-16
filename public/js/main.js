//Get data from events.js
var gigInfo = data.concerts;
console.log(gigInfo);

//Initialize Vue.js
var app = new Vue({
    el: "#app",

    data: {
        dataForTable: [],
        sortedBand: [],
        sortedDate: [],
        sortedCountry: [],

    },

    created: function () {
        this.getData();
        console.log("1st!")
        console.log(this.dataForTable);
        console.log("2nd!")
        this.sortingTheData();
        console.log(this.sortedBand);

    },



    methods: {

        getData: function () {
            for (var i = 0; i < gigInfo.length; i++) {
                this.dataForTable.push(gigInfo[i]);
            }
        },
        /* 
                sortMembers: function () {
                    //Loyalty:
                    this.membersVotesLeastParty = [...this.members].sort(function (a, b) {
                        return a.votes_with_party_pct - b.votes_with_party_pct
                    });
                    this.membersVotesMostParty = [...this.members].sort(function (a, b) {
                        return b.votes_with_party_pct - a.votes_with_party_pct
                    });
                    //Attendance:
                    this.membersMissedVotesPercDesc = [...this.members].sort(function (a, b) {
                        return b.missed_votes_pct - a.missed_votes_pct
                    });
                    this.membersMissedVotesPercAsc = [...this.members].sort(function (a, b) {
                        return a.missed_votes_pct - b.missed_votes_pct
                    })
                }, */

        sortingTheData: function () {
            /* for(var i=0; i < this.dataForTable.length; i++){
                this.sortedBand.push(this.dataForTable[i]['band']);
                this.sortedBand.sort();
            } */

            this.sortedBand = [...gigInfo].sort(function (a, b) {
                return a.band - b.band
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