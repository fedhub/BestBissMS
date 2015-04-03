var express           = require('express');
var mobile_functions  = express.Router();
var mysql             = require('./mysql');

mobile_functions.get_menu_data = function(req, res){

    var query = "SELECT * FROM `food_types`;";
    mysql.MySql_Connection.query(query, function(err, food_types_res) {

        res.send(food_types_res);

    });

}

mobile_functions.get_food_items_data = function(req, res){

    var item_id = req.params.id.split("=");
    item_id = item_id[item_id.length - 1];

    function FoodItem (item_details, addition_types) {
        this.details = item_details;
        this.addition_types = addition_types;
    }

    function AdditionType(details, items){
        this.details = details;
        this.items = items;
    }

    function Item(details){
        this.details = details;
    }


    var food_items_query = "SELECT * FROM `food_items` WHERE food_type_id="+item_id+";";
    mysql.MySql_Connection.query(food_items_query, function(err, food_items_res) {

        var food_items_additions_query = "SELECT * FROM `food_items_additions`;";
        mysql.MySql_Connection.query(food_items_additions_query, function(err, food_items_additions_res) {

            var addition_types_query = "SELECT * FROM `addition_types`;";
            mysql.MySql_Connection.query(addition_types_query, function(err, addition_types_res) {

                var addition_items_query = "SELECT * FROM `addition_items`;";
                mysql.MySql_Connection.query(addition_items_query, function(err, addition_items_res) {

                    var food_items_list = [];

                    for(var i = 0; i < food_items_res.length; i++){
                        var addition_types_id_arr = [];
                        var addition_types_arr = [];

                        for(var j = 0; j < food_items_additions_res.length; j++){
                            if(food_items_res[i].id == food_items_additions_res[j].food_item_id){
                                addition_types_id_arr.push(food_items_additions_res[j].addition_type_id);
                            }
                        }

                        for(var j = 0; j < addition_types_id_arr.length; j++){

                            for(var k = 0; k < addition_types_res.length; k++) {

                                if(addition_types_id_arr[j] == addition_types_res[k].id) {

                                    var items_arr = [];
                                    for(var x = 0; x < addition_items_res.length; x++) {

                                        if(addition_items_res[x].addition_type_id == addition_types_res[k].id){

                                            var item = new Item(addition_items_res[x]);
                                            items_arr.push(item);

                                        }

                                    }

                                    var addition_type = new AdditionType(addition_types_res[k], items_arr);
                                    addition_types_arr.push(addition_type);

                                }

                            }

                        }

                        var food_item = new FoodItem(food_items_res[i], addition_types_arr);
                        food_items_list.push(food_item);

                    }
                    res.send(food_items_list);

                });

            });

        });

    });

}

mobile_functions.private_user_login = function(req, res){

    var phone_number = req.params.phone_number.split("=");
    phone_number = phone_number[phone_number.length - 1];

    var query = "SELECT COUNT(id) AS val FROM `private_customers` WHERE phone_number="+phone_number+";";
    mysql.MySql_Connection.query(query, function(err, result) {

        if(result[0].val > 0) {

            var query = "SELECT * FROM `private_customers` WHERE phone_number=" + phone_number + ";";
            mysql.MySql_Connection.query(query, function (err, private_user) {

                res.send(private_user[0]);

            });

        }
        else{

            var query = "INSERT INTO `private_customers`(`phone_number`) VALUES ('"+phone_number+"')"+";";
            mysql.MySql_Connection.query(query, function (err, result) {

                res.send('user-created');

            });

        }

    });

}

mobile_functions.business_user_login = function(req, res){

    var phone_number = req.params.phone_number.split("=");
    phone_number = phone_number[phone_number.length - 1];

    var company_code = req.params.company_code.split("=");
    company_code = company_code[company_code.length - 1];

    var query = "SELECT COUNT(id) AS val FROM `business_customers` WHERE phone_number="+phone_number+";";
    mysql.MySql_Connection.query(query, function(err, result) {

        if(result[0].val > 0) {

            var query = "SELECT * FROM `business_customers` WHERE phone_number="+phone_number+";";
            mysql.MySql_Connection.query(query, function (err, business_user) {

                if(business_user[0].company_code != company_code)
                    res.send('incorrect-company-code')
                else
                    res.send(business_user[0]);

            });

        }
        else{

            res.send('phone-not-exist');

        }

    });

}

mobile_functions.make_order = function(req, res){

    var info = JSON.parse(req.body.data);
    var my_cart = info.my_cart;
    var customer_details = info.customer_details;
    var due_time = info.due_time;
    var order_type = info.order_type;
    var payment_method = info.payment_method;
    var phone_number = customer_details.phone_number;

    for(var i = 0; i < my_cart.cart_items.length; i++){
        var food_item_id = my_cart.cart_items[i].item.id;
        var addition_types = '';
        for(var j = 0; j < my_cart.cart_items[i].addition_types.length; j++){
            addition_types += my_cart.cart_items[i].addition_types[j].type.id+',';
        }
        addition_types = addition_types.substr(0, addition_types.length-1);
        var query = "INSERT INTO `last_orders`(`phone_number`, `food_item_id`, `addition_types`) VALUES ('"+phone_number+"','"+food_item_id+"','"+addition_types+"');";
        mysql.MySql_Connection.query(query, function(err, result) {
            res.end('last orders updated');
        });
    }

}



module.exports = mobile_functions;
