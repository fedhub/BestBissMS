var express    = require('express');
var functions  = express.Router();
var mysql      = require('./mysql');

// export functions

functions.edit_additions_type = function(req, res){

    var id = req.params.id;
    var info = JSON.parse(req.body.data);
    var name = info.name;
    var description = info.description;
    var selection_type = info.radio;
    var selections_amount = info.option;

    var query = "UPDATE `addition_types` SET `name`=\""+name+"\",`description`=\""+description+"\",`selection_type`=\""+selection_type+"\",`selections_amount`=\""+selections_amount+"\" WHERE `id`="+id+";";
    mysql.MySql_Connection.query(query, function(err, result) {
        var message = '';
        if(!err)
            message = 'המידע עודכן בהצלחה';
        else
            message = 'הייתה בעיה בעדכון המידע, אנא נסה שוב';
        res.send(message);
    });

}

functions.edit_addition_item = function(req, res){

    var id = req.params.id;
    var info = JSON.parse(req.body.data);
    var name = info.name;
    var description = info.description;
    var price = info.price;

    var query = "UPDATE `addition_items` SET `name`=\""+name+"\",`description`=\""+description+"\",`price`=\""+price+"\" WHERE `id`="+id+";";
    mysql.MySql_Connection.query(query, function(err, result) {
        var message = '';
        if(!err)
            message = 'המידע עודכן בהצלחה';
        else
            message = 'הייתה בעיה בעדכון המידע, אנא נסה שוב';
        res.send(message);
    });

}

functions.edit_addition_item = function(req, res){

    var id = req.params.id;
    var info = JSON.parse(req.body.data);
    var name = info.name;
    var description = info.description;
    var price = info.price;

    var query = "UPDATE `addition_items` SET `name`=\""+name+"\",`description`=\""+description+"\",`price`=\""+price+"\" WHERE `id`="+id+";";
    mysql.MySql_Connection.query(query, function(err, result) {
        var message = '';
        if(!err)
            message = 'המידע עודכן בהצלחה';
        else
            message = 'הייתה בעיה בעדכון המידע, אנא נסה שוב';
        res.send(message);
    });

}

functions.edit_food_item = function(req, res){

    var id = req.params.id;
    var info = JSON.parse(req.body.data);
    var name = info.name;
    var description = info.description;
    var price = info.price;

    var query = "UPDATE `food_items` SET `name`=\""+name+"\",`description`=\""+description+"\",`price`=\""+price+"\" WHERE `id`="+id+";";
    mysql.MySql_Connection.query(query, function(err, result) {
        var message = '';
        if(!err)
            message = 'המידע עודכן בהצלחה';
        else
            message = 'הייתה בעיה בעדכון המידע, אנא נסה שוב';
        res.send(message);
    });

}

functions.get_edit_additions_type_page = function(req, res){

    var category_id = req.params.category_id.split("=");
    category_id = category_id[category_id.length - 1];

    var category_name = req.params.category_name.split("=");
    category_name = category_name[category_name.length - 1];

    var food_item_id = req.params.food_item_id.split("=");
    food_item_id = food_item_id[food_item_id.length - 1];

    var food_item_name = req.params.food_item_name.split("=");
    food_item_name = food_item_name[food_item_name.length - 1];

    var additions_type_id = req.params.additions_type_id.split("=");
    additions_type_id = additions_type_id[additions_type_id.length - 1];

    var additions_type_name = req.params.additions_type_name.split("=");
    additions_type_name = additions_type_name[additions_type_name.length - 1];

    var query = "SELECT * FROM `addition_types` WHERE id="+additions_type_id+";";
    mysql.MySql_Connection.query(query, function(err, additions_type_res) {

        var query = "SELECT COUNT(id) AS val FROM `addition_items` WHERE addition_type_id="+additions_type_id+";";
        mysql.MySql_Connection.query(query, function(err, items_count_res) {

            var previous_page = category_name;
            previous_page += ' - ';
            previous_page += food_item_name;
            previous_page += ' - ';
            previous_page += 'סט תוספות: ';
            previous_page += additions_type_name;

            var current_page = "עריכת סט תוספות: ";
            current_page += additions_type_name;

            var title = 'עריכת סט תוספות: ';
            title += additions_type_name;

            var breadcrumbs = '<a href="/">דף הבית</a> > <a href="/menu">תפריט</a> > <a href="/menu-items&id='+category_id+'&name='+category_name+'">'+previous_page+'</a> > <a href="#">'+current_page+'</a>';

            res.render('edit-additions-type', {
                title: title,
                breadcrumbs : breadcrumbs,
                selection_type: selection_type(additions_type_res[0].selection_type, additions_type_res[0].selections_amount),
                additions_type: additions_type_res,
                items_count: items_count_res,
                is_def_radio: is_def_radio,
                is_def_option: is_def_option
            });

        });

    });

}

var is_def_radio = function(selection_type, curr){

    if(selection_type == curr)
        return "checked";
    return;

}

var is_def_option = function(selection_amount, curr){

    if(selection_amount == curr)
        return "selected";
    return;

}

functions.get_menu_page = function(req, res){

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

functions.get_edit_addition_item_page = function(req, res){

    var category_id = req.params.category_id.split("=");
    category_id = category_id[category_id.length - 1];

    var category_name = req.params.category_name.split("=");
    category_name = category_name[category_name.length - 1];

    var food_item_id = req.params.food_item_id.split("=");
    food_item_id = food_item_id[food_item_id.length - 1];

    var food_item_name = req.params.food_item_name.split("=");
    food_item_name = food_item_name[food_item_name.length - 1];

    var additions_type_id = req.params.additions_type_id.split("=");
    additions_type_id = additions_type_id[additions_type_id.length - 1];

    var additions_type_name = req.params.additions_type_name.split("=");
    additions_type_name = additions_type_name[additions_type_name.length - 1];

    var addition_item_id = req.params.addition_item_id.split("=");
    addition_item_id = addition_item_id[addition_item_id.length - 1];

    var addition_item_name = req.params.addition_item_name.split("=");
    addition_item_name = addition_item_name[addition_item_name.length - 1];


    var previous_page = category_name;
    previous_page += ' - ';
    previous_page += food_item_name;
    previous_page += ' - ';
    previous_page += additions_type_name;

    var current_page = "עריכת ";
    current_page += addition_item_name;

    var title = 'עריכת ';
    title += addition_item_name;

    var breadcrumbs = '<a href="/">דף הבית</a> > <a href="/menu">תפריט</a> > <a href="/menu-items&id='+category_id+'&name='+category_name+'">'+previous_page+'</a> > <a href="#">'+current_page+'</a>';

    var query = "SELECT * FROM `addition_items` WHERE id="+addition_item_id+";";
    mysql.MySql_Connection.query(query, function(err, addition_item_res) {

        query = "SELECT * FROM `food_items` WHERE `id` IN ";
        query += "(SELECT `food_item_id` FROM `food_items_additions` WHERE `addition_type_id`="+additions_type_id+")";
        mysql.MySql_Connection.query(query, function(err, related_food_items_res) {

            res.render('edit-addition-item', {
                addition_item_id: addition_item_id,
                title: title,
                breadcrumbs : breadcrumbs,
                item: addition_item_res,
                related_food_items: related_food_items_res
            });

        });

    });

}

functions.get_edit_food_item_page = function(req, res){

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
            item_id: item_id,
            title: title,
            breadcrumbs : breadcrumbs,
            item: rows
        });

    }

    var query = "SELECT * FROM `food_items` WHERE id="+item_id+";";
    runQuery(query, food_item);

}

functions.get_food_items_page = function(req, res){

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
                        selection_type: selection_type,
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

var selection_type = function(selection_type, selections_amount){

    var msg = '';

    if(selection_type == 'required_exact')
        msg = 'בחר בדיוק ';
    else if(selection_type == 'required_min')
        msg = 'בחר לפחות ';
    else if(selection_type == 'optional_max')
        msg = 'אופציונלי עד ';

    msg += selections_amount;
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