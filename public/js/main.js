var gigInfo = data.concerts;

new Vue({
    el: "#app",

    data: {
        band: [],
        date: [],
        where: []
    },

    

    methods: {

        getData: function(){
            for(var i = 0; i < this.gigInfo.length; i++){
                this.band.push(this.gigInfo[i].band);
                return this.band

            };

            console.log(this.getData());

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