var express    = require('express');
var my_sql     = require('mysql');
var mysql      = express.Router();

mysql.MySql_Connection = my_sql.createConnection({
    host     : 'mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/',
    user     : 'adminjecMATf',
    //port	 : 3306,
    password : 'z6vtVT6CwJnx',
    database : 'nodejs'
});

mysql.MySql_Connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n"+err);
    }
});

module.exports = mysql;
