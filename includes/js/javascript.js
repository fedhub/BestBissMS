$(document).ready(function(){

    $('.item-container').click(function(e){

        if(e.target.id != "edit")
            $(this).next('.addition-items-container').toggle();
    });

    $('form').submit(function(e){

        e.preventDefault();

        var class_name = $(this).attr('class');
        var url = '';

        if(class_name == 'food-item-form'){

            var info = {
                name : $('.'+class_name+' textarea[name=name]').val(),
                description : $('.'+class_name+' textarea[name=description]').val(),
                price : $('.'+class_name+' textarea[name=price]').val()
            }
            url = '/edit-food-item&'+$(this).attr('id');
        }

        if(class_name == 'addition-item-form'){

            var info = {
                name : $('.'+class_name+' textarea[name=name]').val(),
                description : $('.'+class_name+' textarea[name=description]').val(),
                price : $('.'+class_name+' textarea[name=price]').val()
            }
            url = '/edit-addition-item&'+$(this).attr('id');
        }

        if(class_name == 'additions-type-form'){

            var info = {
                name : $('.'+class_name+' textarea[name=name]').val(),
                description : $('.'+class_name+' textarea[name=description]').val(),
                radio : $('.'+class_name+' input[type=radio]:checked').attr('value').toString(),
                option: $('.'+class_name+' select[name=selector]').val()
            }
            url = '/edit-additions-type&'+$(this).attr('id');
        }

        $.ajax({

            type: 'POST',
            url: url,
            data : {data : JSON.stringify(info)}

        }).done(function(res){
            $('#message-panel').text(res);
        });



    });

});