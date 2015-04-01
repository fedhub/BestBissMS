var base_url = 'localhost:3001';
var index = 0;

var socket = io.connect('http://'+base_url,{
    'reconnect': true,
    'reconnection delay': 2000,
    'max reconnection attempts': 10
});

$(document).ready(function() {

    socket.on('new-order-arrived', function (data) {
        new_order_arrived(data);
    });

});

function new_order_arrived(data){

    console.log('here');

    var $cp_container = $('#cp-container');

    var order_index = $('<section>', {class: 'order-index'}).append($('<p>', {text: index++}));
    var order_container = $('<section>', {class: 'order-container', id: data});

    order_container.append(order_index);

    $cp_container.append(order_container);

}