var express    = require('express');
var router     = express.Router();
var functions  = require('./functions');
var server     = require('./server');

router.get('/say-hello-cordova', function(req, res){
    res.send('cordova test succeeded');
});

router.get('/', function(req, res){
    res.render('index');
});

router.get('/menu', function(req, res){
    functions.get_menu_page(req, res);
});

router.get('/menu-items&:id&:name', function(req, res){

    functions.get_food_items_page(req, res);

});

router.get('/edit-food-item&:item_id&:item_name&:category_id&:category_name', function(req, res){

    functions.get_edit_food_item_page(req, res);

});

router.get('/edit-addition-item&:category_id&:category_name&:food_item_id&:food_item_name&:additions_type_id&:additions_type_name&:addition_item_id&:addition_item_name', function(req, res){

    functions.get_edit_addition_item_page(req, res);

});

router.get('/edit-additions-type&:category_id&:category_name&:food_item_id&:food_item_name&:additions_type_id&:additions_type_name', function(req, res){

    functions.get_edit_additions_type_page(req, res);

});

router.post('/edit-food-item&:id', function(req, res){

    functions.edit_food_item(req, res);

});

router.post('/edit-addition-item&:id', function(req, res){

    functions.edit_addition_item(req, res);

});

router.post('/edit-additions-type&:id', function(req, res){

    functions.edit_additions_type(req, res);

});

module.exports = router;

