$(document).ready(function(){

    $('.item-container').click(function(e){

        if(e.target.id != "edit")
            $(this).next('.addition-items-container').toggle();
    });

});