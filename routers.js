var express    = require('express');
var router     = express.Router();
var functions  = require('./functions');
var server     = require('./server');

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

router.post('/edit-food-item&:id', function(req, res){
    functions.edit_food_item(req, res);

});

/*router.post('/edit-food-item',function(req,res){
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    console.log("name = " + name + ", description is "+description);
    var msg = "yes";
    res.render('edit-food-item', {
        msg: msg
    });
});*/

module.exports = router;

