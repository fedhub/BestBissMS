$(document).ready(function(){

    $("#main-content").onLoad(function(){
        alert("loaded");
        $.post("/get-menu", function(json){

            alert(json);
            var menu = JSON && JSON.parse(json) || $.parseJSON(json);
            $('#main-content').append("danielle");
            //display_menu(menu);
        });

    });



});

function doStuff(){

    $.post("/get-menu", function(json){
        var menu = JSON && JSON.parse(json) || $.parseJSON(json);
        display_menu(menu);
    });
}

function display_menu(menu){

    var menu_container = $('<div>', {
        class: 'menu-container'
    });

    for(var i = 0 in menu){
        alert(menu[i].name);
        var food_type_container = $('<div>', {
            class: 'food-type-container'
        });

        var food_type_name = $('<p>', {
            text: menu[i].name
        });

        food_type_container.append(food_type_name);
        menu_container.append(food_type_container);

    }


    $('.main-content').append(menu_container);

}