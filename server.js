var express    = require("express");
var path       = require('path');
var bodyParser = require('body-parser');
var app        = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware
app.use(express.static(path.join(__dirname, 'includes')));
app.use(bodyParser.urlencoded({ extended: false }));

// define routes
app.use(require('./routers'));
app.use(require('./mysql'));
app.use(require('./functions'));

// start the server

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("app ready on port "+port);
});









/*app.get("/",function(req,res){
	MySql_Connection.query('SELECT * FROM `food_types`', function(err, rows, fields) {
		MySql_Connection.end();
		if (!err)
			console.log('The solution is: ', rows);
		else
			console.log('Error while performing Query.');
	});
});*/


/*var io     = require('socket.io').listen(3001);
var mysql  = require('mysql');
var url	   = require('url');

var MySql_Connection = mysql.createConnection({
	host     : '127.0.0.1',
	user     : 'root',
	port	 : 3306,
	//password : 'shenkarYoker5',
	database : 'best_biss'
});

var query = "";

io.sockets.on('connection', function(socket) {

	socket.on('get-menu', function(){

		var menu = function(result){
			var url_parts = url.parse(request.url, true);
			console.log(url_parts);
			socket.emit('get-menu', result);
		}

		// Get the food menu
		query = "SELECT * FROM `food_types`;";
		runQuery(query, menu);

	});

});

function runQuery(query, callback){

	MySql_Connection.query(query, function(err, result){
		if(!err){
			callback(result);
		}
		else{
			console.log('');
			console.log("There was an error with MySQL Query: " + query);
			console.log('');
			console.log(err);
		}
	});

}*/