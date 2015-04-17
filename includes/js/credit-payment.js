//var base_url = 'https://www.best-biss.com';
var base_url = 'http://localhost:3000';

var socket = io.connect(base_url,{
    'reconnect': true,
    'reconnection delay': 2000,
    'max reconnection attempts': 10
});

$(document).ready(function(){

    $('p#redirect').click(function(){

        var socket_id = $('p#redirect').text();
        console.log('client id: '+ socket_id);

        window.history.back();

    });

});
