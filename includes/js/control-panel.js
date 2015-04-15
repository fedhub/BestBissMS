var base_url = 'https://www.best-biss.com';
//var base_url = 'http://localhost:3001';
var index = 0;

var socket = io.connect(base_url,{
    'reconnect': true,
    'reconnection delay': 2000,
    'max reconnection attempts': 10
});

$(document).ready(function() {

    socket.on('new-order-arrived', function (info) {
        new_order_arrived(info);
    });

});

function new_order_arrived(data){

    var info = JSON.parse(data);
    var my_cart = info.my_cart;
    var customer_details = info.customer_details;
    var phone_number = info.customer_details.phone_number;
    var due_time = info.due_time;
    var order_type = info.order_type;
    var payment_method = info.payment_method;
    var customer_type = info.customer_type;

    var customer_type_label = '';
    var order_type_label = '';
    var payment_method_label = '';

    if(customer_type == 'private') customer_type_label = 'פרטי';
    if(customer_type == 'business') customer_type_label = 'עסקי';
    if(order_type == 'sit') order_type_label = 'ישיבה';
    if(order_type == 'take-away') order_type_label = 'לקחת';
    if(order_type == 'delivery') order_type_label = 'משלוח';
    if(payment_method == 'cash') payment_method_label = 'מזומן';
    if(payment_method == 'credit') payment_method_label = 'אשראי';


    var $cp_container = $('#cp-container');

    var order_container = $('<section>', {class: 'order-container'});
    var order_index = $('<section>', {class: 'order-index'}).append($('<p>', {text: ++index}));
    order_container.append(order_index);

    for(var i = 0; i < my_cart.cart_items.length; i++){

        var item_container = $('<section>', {class: 'meal-container'});
        var item_title = $('<section>', {class: 'meal-title', text: my_cart.cart_items[i].item.name});
        item_container.append(item_title);

        for(var j = 0; j < my_cart.cart_items[i].addition_types.length; j++){
            var meal_additions_container = $('<section>', {class: 'meal-additions-container'});
            var meal_addition_type = $('<section>', {class: 'meal-addition-type'});
            meal_addition_type.append(my_cart.cart_items[i].addition_types[j].type.name+': ');
            var addition_items = '';
            var meal_addition_items = $('<section>', {class: 'meal-addition-items'});
            for(var k = 0; k < my_cart.cart_items[i].addition_types[j].items.length; k++){
                addition_items += my_cart.cart_items[i].addition_types[j].items[k].name+', ';
            }
            meal_addition_items.append(addition_items.substr(0, addition_items.length-2));
            meal_additions_container.append(meal_addition_type).append(meal_addition_items);
            item_container.append(meal_additions_container);

        }
        order_container.append(item_container);
    }

    var order_details_container = $('<section>', {class: 'order-details-container'});

    var administrative_details_container =
        '<section class="administrative-details-container">'+
            '<section class="detail-container">'+
                '<section class="detail-box"><p>'+customer_type_label+'</p></section>'+
            '</section>'+
            '<section class="detail-container">'+
                '<section class="detail-box"><p>'+order_type_label+'</p></section>'+
            '</section>'+
            '<section class="detail-container">'+
                '<section class="detail-box"><p>'+payment_method_label+'</p></section>'+
            '</section>'+
            '<section class="detail-container">'+
                '<section class="detail-box"><p>'+due_time+'</p></section>'+
            '</section>'+
        '</section>';

    var personal_details = '';

    if(order_type == 'delivery'){
        personal_details =
            '<section class="customer-details">'+
                '<section class="detail"><p>'+customer_details.first_name+'</p></section>'+
                '<section class="detail"><p>'+customer_details.last_name+'</p></section>'+
                '<section class="detail"><p>'+customer_details.phone_number+'</p></section>'+
                '<section class="detail"><p>'+customer_details.street+'</p></section>'+
                '<section class="detail"><p>'+customer_details.house_number+'</p></section>'+
                '<section class="detail"><p>'+customer_details.floor+'</p></section>'+
                '<section class="detail"><p>'+customer_details.enter+'</p></section>'+
                '<section class="detail"><p>'+customer_details.comments+'</p></section>'+
            '</section>';
    }
    else{
        personal_details =
            '<section class="customer-details">'+
                '<section class="detail"><p>'+customer_details.first_name+'</p></section>'+
                '<section class="detail"><p>'+customer_details.last_name+'</p></section>'+
                '<section class="detail"><p>'+customer_details.phone_number+'</p></section>'+
                '<section class="detail"><p>'+customer_details.comments+'</p></section>'+
            '</section>';
    }


    order_details_container.append(administrative_details_container).append(personal_details);

    var level_3 = '';
    var level_4 = '';
    if(order_type == 'delivery') {
        level_3 = 'אריזה';
        level_4 = 'בדרך אלייך';
    }
    if(order_type == 'sit') {
        level_3 = 'האוכל מוכן';
        level_4 = 'מחכה בצלחת';
    }
    if(order_type == 'take-away') {
        level_3 = 'אריזה';
        level_4 = 'מחכה לאיסוף';
    }

    var update_status_container = $('<section>', {class: 'update-status-container'});
    var status_bar = $('<section>', {class: 'status-bar'});
    var first_level = $('<section>', {class: 'status-level first-status status-level-selected'}).append($('<p>', {text: 'ההזמנה התקבלה'})).click({status_level: 0, phone_number: phone_number}, update_status_event);
    var second_level = $('<section>', {class: 'status-level'}).append($('<p>', {text: 'בהכנה'})).click({status_level: 1, phone_number: phone_number}, update_status_event);
    var third_level = $('<section>', {class: 'status-level'}).append($('<p>', {text: level_3})).click({status_level: 2, phone_number: phone_number}, update_status_event);
    var fourth_level = $('<section>', {class: 'status-level last-status'}).append($('<p>', {text: level_4})).click({status_level: 3, phone_number: phone_number}, update_status_event);

    status_bar.append(first_level).append(second_level).append(third_level).append(fourth_level);
    update_status_container.append(status_bar);

    order_details_container.append(update_status_container);

    order_container.append(order_details_container);
    $cp_container.append(order_container);
}

function update_status_event(e){

    var url = base_url+'/update-status';
    var info = {
        phone_number: e.data.phone_number,
        status_level: e.data.status_level
    };
    $.ajax({
        type: 'POST',
        url: url,
        data: {data : JSON.stringify(info)}
    }).done(function(res){
        $('.status-level:eq('+e.data.status_level+')').toggleClass('status-level-selected');
    });

}

