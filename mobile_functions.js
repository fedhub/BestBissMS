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
    var query = '';
    var query2 = '';

    query = "SELECT COUNT(id) AS val FROM `private_customers` WHERE phone_number='"+phone_number+"';";
    mysql.MySql_Connection.query(query, function(err, result) {

        if(result[0].val > 0) {

            query2 = "SELECT * FROM `private_customers` WHERE phone_number='"+phone_number+"';";
            mysql.MySql_Connection.query(query, function (err, private_user) {

                if(!err)
                    res.send(private_user[0]);
                else{
                    console.log('IN : private_user_login \n' + err);
                }

            });

        }
        else{

            query2 = "INSERT INTO `private_customers`(`phone_number`) VALUES ('"+phone_number+"');";
            mysql.MySql_Connection.query(query, function (err, result) {

                if(!err)
                    res.send('user-created');
                else{
                    console.log('IN : private_user_login \n' + err);
                }

            });

        }

    });

}

mobile_functions.business_user_login = function(req, res){

    var phone_number = req.params.phone_number.split("=");
    phone_number = phone_number[phone_number.length - 1];

    var company_code = req.params.company_code.split("=");
    company_code = company_code[company_code.length - 1];

    var query = "SELECT COUNT(id) AS val FROM `business_customers` WHERE phone_number='"+phone_number+"';";
    mysql.MySql_Connection.query(query, function(err, result) {

        if(!err) {
            if (result[0].val > 0) {

                var query = "SELECT * FROM `business_customers` WHERE phone_number='" + phone_number + "';";
                mysql.MySql_Connection.query(query, function (err, business_user) {

                    if(!err) {
                        if (business_user[0].company_code != company_code)
                            res.send('incorrect-company-code')
                        else
                            res.send(business_user[0]);
                    }
                    else{
                        console.log('IN : business_user_login\n' + err);
                    }

                });

            }
            else {

                res.send('phone-not-exist');

            }
        }
        else{
            console.log('IN : business_user_login\n' + err);
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
    var customer_type = info.customer_type;
    var phone_number = customer_details.phone_number;
    var query;
    var new_budget = 0;

    if(order_type == 'delivery') {
        if(customer_type == 'business') {
            new_budget = customer_details.budget - my_cart.total_price;
        }
        update_customer_details_in_db(customer_type, phone_number, customer_details, new_budget);
    }
    if(order_type != 'delivery' && customer_type == 'business'){
        new_budget = customer_details.budget-my_cart.total_price;
        query = "UPDATE `business_customers` SET `budget`="+new_budget+" WHERE `phone_number`='"+phone_number+"';";
        mysql.MySql_Connection.query(query);
    }

    for(var i = 0; i < my_cart.cart_items.length; i++){
        var food_item_id = my_cart.cart_items[i].item.id;
        var addition_types = '';
        for(var j = 0; j < my_cart.cart_items[i].addition_types.length; j++){
            addition_types += my_cart.cart_items[i].addition_types[j].type.id+'[';
            for(var k = 0; k < my_cart.cart_items[i].addition_types[j].items.length; k++){
                addition_types += my_cart.cart_items[i].addition_types[j].items[k].id+',';
            }
            addition_types = addition_types.substr(0, addition_types.length-1);
            addition_types += '],';
        }
        addition_types = addition_types.substr(0, addition_types.length-1);
        query = "INSERT INTO `last_orders`(`phone_number`, `food_item_id`, `addition_types`) VALUES ('"+phone_number+"','"+food_item_id+"','"+addition_types+"');";
        mysql.MySql_Connection.query(query);
    }

    query = "INSERT INTO `pending_orders`(`phone_number`, `due_time`, `order_type`) VALUES ('"+phone_number+"','"+due_time+"','"+order_type+"');";
    mysql.MySql_Connection.query(query);

    res.end('updated');

}

function update_customer_details_in_db(customer_type, phone_number, customer_details, new_budget){

    var table = '';
    if(customer_type == 'private') table = 'private_customers';
    if(customer_type == 'business') table = 'business_customers';

    var query =
        "UPDATE `"+table+"` SET "+
        "`first_name`='"+customer_details.first_name+"',"+
        "`last_name`='"+customer_details.last_name+"',"+
        "`street`='"+customer_details.street+"',"+
        "`house_number`='"+customer_details.house_number+"',"+
        "`floor`='"+customer_details.floor+"',"+
        "`enter`='"+customer_details.enter+"',"+
        "`comments`='"+customer_details.comments+"'";
    if(customer_type == 'business')
        query += ",`budget`="+new_budget;

    query +=" WHERE `phone_number`='"+phone_number+"';";
    mysql.MySql_Connection.query(query, function(err, response){
        if(!err)
            return;
        else{
            console.log('IN : update_customer_details_in_db \n' + err);
        }
    });

}

mobile_functions.check_status = function(req, res){

    var info = JSON.parse(req.body.data);
    var phone_number = info.phone_number;

    var query = "SELECT * FROM `pending_orders` WHERE `phone_number`='"+phone_number+"';";
    mysql.MySql_Connection.query(query, function(err, order_status){
        if(!err)
            res.send(order_status[0]);
        else{
            console.log('IN : check_status \n' + err);
        }
    });

}

mobile_functions.update_status = function(req, res){

    var info = JSON.parse(req.body.data);
    var status_level = info.status_level;
    var phone_number = info.phone_number;

    var query = "UPDATE `pending_orders` SET `status_level`="+status_level+" WHERE `phone_number`='"+phone_number+"';";
    mysql.MySql_Connection.query(query, function(err, resuslt){
        if(!err)
            res.send('done');
        else{
            console.log('IN : update_status \n' + err);
        }
    });

}

module.exports = mobile_functions;
