var gigInfo = data.concerts;

console.log(gigInfo);


new Vue({
    el: "#app",

    data() {
        return{
            data: gigInfo
        }
    },

    created: function(){
        this.gigBands()
    },

    computed: {
        gigBands(){
            return this.data.map(dataSet => dataSet[0])
            console.log("hi")
        }

       
    }

    /* created: function(){
        this.getData();
    },

    methods: {

        getData: function(){
            for(var i = 0; i < gigInfo.length; i++){
                this.band.push(gigInfo.band[i]);
                

            };
            return this.band;
            console.log(this.band);

        }

    }, */

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