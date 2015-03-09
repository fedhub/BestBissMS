var app = angular.module('BestBiss_MS', []);

app.config(['$routeProvider', function($routeProvider){
		
	$routeProvider
	.when('/sandwiches',{
		templateUrl: 'partials/menu/sandwiches.html',
		controller: 'sandwiches'
	}).otherwise({redirectTo: '/'});

}]);

var socket = io.connect('http://localhost:3001',{
	'reconnect': true,
	'reconnection delay': 2000,
	'max reconnection attempts': 10
});

function load_food_menu(food_menu_items){
	
	var edit_made = false;
	
	for(var i in food_menu_items[0]){
		
		var food_container= ($('<section>', {
			class: 'food_container'
		}))
		.mouseenter(function(){
			$(this).find('.delete_container').find('.delete_button').css('display','block');
		})
		.mouseleave(function(){
			$(this).find('.delete_container').find('.delete_button').css('display','none');
		});
		
		var delete_button = ($('<section>', {
			class: 'delete_button' 
		}));
		var delete_container = ($('<section>', {
			class: 'delete_container'
		}));
		
		$(delete_container).append(delete_button);
		
		$(food_container).append(delete_container);
		
		
		var food_item = ($('<section>', {
			class: 'food_item'
		}));
		
		var food_additions = ($('<section>', {
			class: 'food_additions'
		}));
		
		var food_item_img = ($('<section>', {
			class: 'food_item_img'
		})).css("background-image" , "url('data:image/png;base64, "+food_menu_items[0][i].image+"')");
		
		var food_item_info = ($('<section>', {
			class: 'food_item_info'
		}));
		
		var food_item_info_title = ($('<section>', {
			class: 'food_item_info_title'
		}));
		
		var food_item_info_title_p = ($('<p>', {
			text: food_menu_items[0][i].title
		}))
		.click(function() {
			$(this).attr({contenteditable:"true"});
			edit_made = true;
		});
		
		var food_item_info_description_p = ($('<p>', {
			text: food_menu_items[0][i].description
		}))
		.click(function() {
			$(this).attr({contenteditable:"true"});
			edit_made = true;
		});
		
		var food_item_info_description = ($('<section>', {
			class: 'food_item_info_description'
		}));
		
		var food_item_price = ($('<section>', {
			class: 'food_item_price'
		}));
		
		var food_item_price_p = ($('<p>', {
			text: food_menu_items[0][i].price
		}))
		.click(function() {
			$(this).attr({contenteditable:"true"});
			edit_made = true;
		});
		
		$(food_item_price)
		.append(food_item_price_p);
		
		$(food_item_info_title)
		.append(food_item_info_title_p);
		
		$(food_item_info_description)
		.append(food_item_info_description_p);
		
		$(food_item_info)
		.append(food_item_info_title)
		.append(food_item_info_description);
		
		$(food_item)
		.append(food_item_img)
		.append(food_item_info)
		.append(food_item_price);
		
		var additions_container = ($('<section>', {
			class: 'additions_container' 
		}));
		
		for(var j in food_menu_items[1][i]){
			
			var additions_title = ($('<section>', {
				class: 'additions_title',
			}));
			
			var additions_title_p = ($('<p>', {
				text: food_menu_items[1][i][j].name
			})).appendTo(additions_title);
			
			var additions_items = ($('<section>', {
				class: 'additions_items',
				id: 'additions_items_'+i+''+j
			}));
			
			for(var k in food_menu_items[2][i][j]){

					var addition_item = ($('<section>', {
						class: 'addition_item'	
					}));
					
					var addition_item_header = ($('<section>', {
						class: 'addition_item_header'
					}));
					
					var addition_item_header_info = ($('<section>', {
						class: 'addition_item_header_info'
					}));
					
					var addition_item_header_name = ($('<section>', {
						class: 'addition_item_header_name',
						
					}))
					.append($('<p>', {
						text: food_menu_items[2][i][j][k].name
					}));
					
					var addition_item_header_description = ($('<section>', {
						class: 'addition_item_header_description',
					}))
					.append($('<p>', {
						text: 'תאור עבור התוספת'
					}));
					
					var addition_item_header_price= ($('<section>', {
						class: 'addition_item_header_price',
					}))
					.append($('<p>', {
						text: food_menu_items[2][i][j][k].price
					}));
					
					var addition_item_img = ($('<section>', {
						class: 'addition_item_img'
					})).css("background-image" , "url('data:image/png;base64, "+food_menu_items[2][i][j][k].image+"')");
					
					$(addition_item_header_info)
					.append(addition_item_header_name)
					.append(addition_item_header_price);
					
					$(addition_item_header)
					.append(addition_item_header_info)
					.append(addition_item_header_description);
					
					$(addition_item)
					.append(addition_item_header)
					.append(addition_item_img);
					
					$(additions_items).append(addition_item);

			}
			
			var add_frame = ($('<section>', {
				class: 'add_frame'	
			}))
			.click(function(){
				
				var new_addition_item = ($('<section>', {
					class: 'addition_item'
				}));
				
				$(this).parent().append(new_addition_item).append($(this));	
				
			});
			
			$(additions_items).append(add_frame);
			
			var clear = ($('<div>', {
				class: 'clear'
			}));
			
			$(additions_container)
			.append(additions_title)
			.append(additions_items)
			.append(clear);
			
		}
		
		var approve_button = ($('<section>', {
			text: 'אשר שינויים',
			class: 'approve_changes_button'
		}))
		.click(function(){
			if(!edit_made){
				alert('לא התבצעו שינויים');
			}
		});
		
		$(food_additions).append(additions_container);
		
		$(food_container)
		.append(food_item)
		.append(food_additions)
		.append(approve_button);
		
		$('section.sandwiches').append(food_container);
	}

}

app.controller('sandwiches', function($scope){

	var details_arr = ['get food menu','sandwich_menu'];
	socket.emit('get food menu', details_arr);
	
});

socket.on('get food menu', function(food_menu_items){
	
	load_food_menu(food_menu_items);

});









