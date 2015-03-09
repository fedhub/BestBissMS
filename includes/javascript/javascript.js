$(document).ready(function(){
	
	// side nav
	$('nav.side_nav ul li').click(function(){
		
		$(this).css({
			'font-size':'83%',
			'text-decoration':'underline',
			'color':'#000'
		});
		
	});
	
	
	//top nav
	$('nav.top_nav ul li').click(function(){
		
		$(this).css({
			'font-size':'83%',
			'text-decoration':'underline',
			'color':'#000'
		});
		
	});
	
	
	// add manager
	/*$('nav.top_nav ul li:eq('+3+')').click(function(){
		
		addManager();
		
	});
	
	// sandwich_menu
	$('nav.side_nav ul li:eq('+0+')').click(function(){
		
		sandwich_menu();
		
	});*/

});


/*function addManager(){
	
	var bread_crumb = ($('<section>',{
		class: 'bread_crumb',
		text: 'הוסף מנהל >>'
	}));
	
	$('section.main').empty();
	$('section.main').append(bread_crumb);
	
	var add_section = ($('<section>', {
		class: 'add_manager_section'
	}));
	
	var manager_name = ($('<input>', {
		id: 'manager_name',
		type: 'text'
	}));
	
	var manager_email = ($('<input>', {
		id: 'manager_email',
		type: 'email'
	}));
	
	var manager_password = ($('<input>', {
		id: 'manager_password',
		type: 'password'
	}));
	
	var add_manager_button = ($('<button>', {
		text: 'הוסף'
	})).click(function(){
		alert('clicked');
		var manager_details = ['add_manager',$('#manager_name').val(),$('#manager_email').val(),$('#manager_password').val()];
		
		socket.emit('add_manager', manager_details);
		socket.on('add_manager', function(){
			alert("done successfuly");
		});
	});
	
	$(add_section)
	.append('שם משתמש:').append(manager_name)
	.append('אימייל:').append(manager_email)
	.append('סיסמה:').append(manager_password)
	.append(add_manager_button);
	
	$('section.main').append(add_section);
	
}


function sandwich_menu(){
	
	var bread_crumb = ($('<section>',{
		class: 'bread_crumb',
		text: 'עריכת תפריט סנדוויצ\'ים >>'
	}));
	
	$('section.main').empty();
	$('section.main').append(bread_crumb);
	
	var sandwich_menu_option;
	var sandwich_menu_section = ($('<section>', {
		class: 'sandwich_menu_section'
	}));
	
	sandwich_menu_option = ($('<a>', {
		class: 'sandwich_menu_options',
		id: 'add_sandwich',
		text: 'הוסף סנדוויץ\' לתפריט'
	}))
	.append('<br/>')
	.appendTo(sandwich_menu_section)
	.click(function(){
		add_sandwich();
	});
	
	sandwich_menu_option = ($('<a>', {
		class: 'sandwich_menu_options',
		id: 'delete_sandwich',
		text: 'מחק סנדוויץ\' מהתפריט'
	}))
	.append('<br/>')
	.appendTo(sandwich_menu_section)
	.click(function(){
		delete_sandwich();
	});
	
	sandwich_menu_option = ($('<a>', {
		class: 'sandwich_menu_options',
		id: 'edit_sandwich',
		text: 'ערוך סנדוויץ\' בתפריט'
	}))
	.append('<br/>')
	.appendTo(sandwich_menu_section)
	.click(function(){
		edit_sandwich();
	});
	
	$('section.main').append(sandwich_menu_section);
	
}

function add_sandwich(){
	
	$('section.main').find('.bread_crumb').append(' הוספת סנדוויץ\' לתפריט >>');
	$('#add_sandwich').css({'color':'red','text-decoration':'underline','font-weight':'bold'});
	
	var add_sandwich_section = ($('<section>', {
		class: 'add_sandwich_section'
	}));
	
	var new_sandwich_title = ($('<input>', {
		type: 'text',
		id: 'new_sandwich_title'
	}));
	
	var new_sandwich_description = ($('<input>', {
		type: 'text',
		id: 'new_sandwich_description'
	}));
	
	var new_sandwich_price = ($('<input>', {
		type: 'number',
		value: '0',
		id: 'new_sandwich_price'
	}));
	
	var add = ($('<a>', {
		class: 'sandwich_menu_options',
		text: 'הוסף'
	}))
	.click(function(){
		var new_sandwich_arr = ['add_sandwich',$('#new_sandwich_title').val(), $('#new_sandwich_description').val(), $('#new_sandwich_price').val()];
		socket.emit('add_sandwich',new_sandwich_arr);
		socket.on('add_sandwich', function(){
			$('section.main').append('הנסדוויץ\' נוסף בהצלחה!').append('<br/>');
			additions_to_sandwich(callback);
		});
	});
	
	$(add_sandwich_section)
	.append('שם הסנדוויץ\'')
	.append(new_sandwich_title).append('<br/>')
	.append('תיאור מרכיבי הסנדוויץ\'')
	.append(new_sandwich_description).append('<br/>')
	.append('מחיר הסנדוויץ\'')
	.append(new_sandwich_price).append('<br/>')
	.append(add);
	
	$('section.main').append(add_sandwich_section);
	
}

var callback = function(){
	$('section.main').append('צור מנות נלוות או תוספות לסנדוויץ\'');
	$('section.main').append($('<a>', {
		text: 'כאן',
		id: 'new_sandwich_additions',
		class: 'sandwich_menu_options'
	}));
	$('#new_sandwich_additions').click(function(){
		new_sandwich_additions();
	});
	
};

function additions_to_sandwich(callback){
	callback();
}

var counter = 0;

function new_sandwich_additions(){
	
	var sandwich_additions_section = ($('<section>' ,{
		class: 'sandwich_additions_section',
		id: 'sandwich_additions_section'
	}));
	
	var additions_section_title = ($('<input>', {
		type: 'text',
		id: 'additions_section_title'
	}));
	
	var add_addition = ($('<a>', {
		class: 'sandwich_menu_options',
		id: 'add_addition',
		text: '+ תוספת נוספת'
	}));
	
	$(add_addition).click(function(){
		new_sandwich_additions_item();
	});
	
	$(sandwich_additions_section)
	.append('סוג התוספות:')
	.append(additions_section_title).append('<br/><br/>');
	new_sandwich_additions_item(sandwich_additions_section,add_addition);
	
	$('section.main').append(sandwich_additions_section);
	
}

function new_sandwich_additions_item(sandwich_additions_section,add_addition){
	
	counter++;
	
	var sandwich_addition_title = ($('<input>', {
		type: 'text',
		placeholder: 'חובה',
		id: 'sandwich_addition_title'
	}));
	
	var sandwich_addition_description = ($('<input>', {
		type: 'text',
		placeholder: 'לא חובה',
		id: 'sandwich_addition_description'
	}));
	
	var sandwich_addition_price = ($('<input>', {
		type: 'number',
		value: '0',
		id: 'sandwich_addition_price'
	}));
	
	$(sandwich_additions_section)
	.append('תוספת '+counter+': ').append('<br/>')
	.append('שם התוספת: ').append(sandwich_addition_title)
	.append('תיאור: ').append(sandwich_addition_description)
	.append('מחיר התוספת: ').append(sandwich_addition_price).append('<br/>')
	.append(add_addition);
	
}*/











