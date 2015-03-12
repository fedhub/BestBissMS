var express    = require('express');
var functions  = express.Router();
var mysql      = require('./mysql');

// export functions

functions.get_menu = function(req, res){

    var menu = function(rows){

        console.log("hello");

        var objToJson = rows;
        var response = [];
        for (var key in rows) {
            response.push(rows[key]);
        }
        objToJson.response = response;
        var finalresponse = JSON.stringify(objToJson);

        res.end(finalresponse);
    }

    var query = "SELECT * FROM `food_types`;";
    runQuery(query, menu);

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


/*app.get('/', function(req,res) {
    var response = 'Hello';
    fs.readFile('counter.txt','utf-8', function(e,d) {
        if (e) {
            console.log(e);
            res.send(500, 'Something went wrong');
        }
        else {
            console.log(parseInt(d) + 1);
            fs.writeFile('counter.txt',parseInt(d) + 1);
            response += '<p id="c">' + ( parseInt(d) + 1 ) + '</p>';
            res.send(response);
        }
    })
});*/