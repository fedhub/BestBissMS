$(document).ready(function(){

    $('.item-container').click(function(e){

        if(e.target.id != "edit")
            $(this).next('.addition-items-container').toggle();
    });

    $('form').submit(function(e){

        e.preventDefault();

        var info = {
            name : $('textarea[name=name]').val(),
            description : $('textarea[name=description]').val(),
            price : $('textarea[name=price]').val()

        }

        $.ajax({

            type: 'POST',
            url: '/edit-food-item&'+$(this).attr('id'),
            data : {data : JSON.stringify(info)}

        }).done(function(res){
            $('#message-panel').text(res);
        });



    });

});