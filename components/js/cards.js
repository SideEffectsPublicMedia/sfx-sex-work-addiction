$(document).ready(function(){
    function resizeCards(){
        $(".home-card").css("height", $(window).height() + "px")
    }

    var homeMap = {};

    var winHeight = $(window).height(), 
    docHeight = $(document).height(),
    progressBar = $('progress'),
    max, value;

    /* Set the max scrollable area */
    max = docHeight - winHeight;
    progressBar.attr('max', max);

    $(document).ready(function(){
        resizeCards();

        $('aside').fadeTo( 1000, 0 );
    });

    $(document).scroll(function(){
        $('aside:in-viewport').fadeTo( 1500, 1 );

        value = $(window).scrollTop();
        progressBar.attr('value', value);
    });
});