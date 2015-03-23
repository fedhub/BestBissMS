var express           = require('express');
var mobile_router     = express.Router();
var mobile_functions  = require('./mobile_functions');


mobile_router.post('/get-menu-data', function(req, res){
    mobile_functions.get_menu_data(req, res);
});

mobile_router.post('/get-food-items-data&:id', function(req, res){
    mobile_functions.get_food_items_data(req, res);
});

module.exports = mobile_router;