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



module.exports = mobile_functions;
