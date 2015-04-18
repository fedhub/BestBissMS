var base_url = 'https://www.best-biss.com';
//var base_url = 'http://localhost:3000';

$(document).ready(function(){

    get_logo();

    $('.back-button').click(function(){
        window.parent.history.back(-1);
    });

});

function get_logo(){

    $('.payment-logo').css({
        'background': 'url("'+base_url+'/images/mobile_logo.png") no-repeat',
        'background-size': 'contain',
        'background-position': 'center center'
    });

}
