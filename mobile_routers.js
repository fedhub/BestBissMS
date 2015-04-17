var express           = require('express');
var mobile_router     = express.Router();
var mobile_functions  = require('./mobile_functions');

mobile_router.post('/get-menu-data', function(req, res){
    mobile_functions.get_menu_data(req, res);
});

mobile_router.post('/get-food-items-data&:id', function(req, res){
    mobile_functions.get_food_items_data(req, res);
});

mobile_router.post('/private-user-login&:phone_number', function(req, res){
    mobile_functions.private_user_login(req, res);
});

mobile_router.post('/business-user-login&:phone_number&:company_code', function(req, res){
    mobile_functions.business_user_login(req, res);
});

mobile_router.post('/make-order', function(req, res){
    mobile_functions.make_order(req, res);
});

mobile_router.post('/check-status', function(req, res){
    mobile_functions.check_status(req, res);
});

mobile_router.post('/update-status', function(req, res){
    mobile_functions.update_status(req, res);
});

mobile_router.post('/credit-success-page', function(req, res){
   res.render('index');
});

mobile_router.get('/credit-payment&:url&:id', function(req, res){

    var cardcom_url = req.params.url;
    cardcom_url = decodeURIComponent(cardcom_url);
    cardcom_url = cardcom_url.replace('url=','');

    var socket_id = req.params.id;
    socket_id = decodeURIComponent(socket_id);
    socket_id = socket_id.replace('id=','');

    res.render('credit-payment', {
        cardcom_url: cardcom_url,
        socket_id: socket_id
    });

});

/*mobile_router.post('/credit-payment', function(req, res){

    var info = JSON.parse(req.body.data);
    var cardcom_url = decodeURIComponent(info.cardcom_url);
    var socket_id = decodeURIComponent(info.socket_id);

    req.method = 'get';

   res.redirect('credit-payment-page');/*, {
        cardcom_url: cardcom_url,
        socket_id: socket_id
    });*/

//});

module.exports = mobile_router;