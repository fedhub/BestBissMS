var express    = require('express');
var functions  = express.Router();
var mysql      = require('./mysql');

// export functions

functions.get_menu = function(req, res){

    var menu = function(rows){

        var breadcrumbs = '<a href="/">דף הבית</a> > <a href="#">תפריט</a>';

        res.render('menu', {
            title: 'תפריט',
            breadcrumbs : breadcrumbs,
            items: rows
        });

    }

    var query = "SELECT * FROM `food_types`;";
    runQuery(query, menu);

}

functions.edit_food_item = function(req, res){

    var item_id = req.params.item_id.split("=");
    item_id = item_id[item_id.length - 1];

    var item_name = req.params.item_name.split("=");
    item_name = item_name[item_name.length - 1];

    var category_id = req.params.category_id.split("=");
    category_id = category_id[category_id.length - 1];

    var category_name = req.params.category_name.split("=");
    category_name = category_name[category_name.length - 1];

    var current_page = "עריכת ";
    current_page += item_name;

    var breadcrumbs = '<a href="/">דף הבית</a> > <a href="/menu">תפריט</a> > <a href="/menu-items&id='+category_id+'&name='+category_name+'">'+category_name+'</a> > <a href="#">'+current_page+'</a>';

    var food_item = function(rows){

        var title = 'עריכת ';
        title += item_name;

        res.render('edit-food-item', {
            //update: update_food_item,
            title: title,
            breadcrumbs : breadcrumbs,
            item: rows
        });

    }

    var query = "SELECT * FROM `food_items` WHERE id="+item_id+";";
    runQuery(query, food_item);

}

functions.get_food_items = function(req, res){

    var item_id = req.params.id.split("=");
    item_id = item_id[item_id.length - 1];

    var item_name = req.params.name.split("=");
    item_name = item_name[item_name.length - 1];

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

                    var breadcrumbs = '<a href="/">דף הבית</a> > <a href="/menu">תפריט</a> > <a href="#">' + item_name + '</a>';

                    res.render('menu-items', {
                        is_required_selection: is_required_selection,
                        title: item_name,
                        id: item_id,
                        breadcrumbs: breadcrumbs,
                        items: food_items_list
                    });

                });

            });

        });

    });

}

/*var update_food_item = function(name, description, price){

    var query = "UPDATE `food_items` SET `name`="+name+" `description`="+description+" `price`="+price+" WHERE id="+item_id+";";
    runQuery(query, food_item);

}*/

var is_required_selection = function(selection_type, max_selections){

    var msg = "";

    if(selection_type == 'required' && max_selections > 0){
        msg = "בחר ";
        msg += max_selections;
        msg += " ";
        msg += "פריטים";
        return msg;
    }
    else if(selection_type == 'required' && max_selections == 0){
        msg = "בחר לפחות פריט אחד";
        return msg;
    }
    else if(selection_type == 'optional' && max_selections > 0){
        msg = "בחר עד ";
        msg += max_selections;
        msg += " ";
        msg += "פריטים (אופציונלי)";
        return msg;
    }
    else if(selection_type == 'optional' && max_selections == 0){
        msg = "אופציונלי";
        return msg;
    }

    msg = "אופציונלי";
    return msg;

}

// private functions

function runQuery(query, callback){

    mysql.MySql_Connection.query(query, function(err, rows, fields){
        if(!err){
            callback(rows);
        }
        else{
            console.log('');
            console.log("There was an error with MySQL Query: " + query);
            console.log('');
            console.log(err);
        }
    });

}


module.exports = functions;