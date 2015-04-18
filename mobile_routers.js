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

mobile_router.get('/credit-payment&:id', function(req, res){

    var cardcom_url = req.params.id;
    cardcom_url = decodeURIComponent(cardcom_url);
    cardcom_url = cardcom_url.replace('id=','');
    cardcom_url = "https://"+cardcom_url;

    //res.render('credit-payment');

    res.render('credit-payment', {
        cardcom_url: cardcom_url
    });

});

mobile_router.get('/payment-success', function(req, res){

    res.render('payment-success');

});

module.exports = mobile_router;