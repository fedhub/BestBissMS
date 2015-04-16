var express    = require('express');
var my_sql     = require('mysql');
var mysql      = express.Router();

/*mysql.MySql_Connection = my_sql.createConnection({
    host     : 'mysql17.000webhost.com',
    user     : 'a9396256_sw',
    //password : 'shenkarYoker5',
    database : 'a9396256_best'
    //port     : port2
});*/

mysql.MySql_Connection = my_sql.createPool({
    connectionLimit : 4,
    host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
    user     : 'bbedb78c1fea39',
    port	 : 3306,
    password : '54c23032',
    database : 'bestbisAflwSbD71'
});

mysql.getConnection = function(callback){
    mysql.MySql_Connection.getConnection(function(err, conn){
        if(err){
            return callback(err);
        }
        callback(err, conn);
    });
};

/*mysql.MySql_Connection = my_sql.createConnection({
    host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
    user     : 'bbedb78c1fea39',
    //port	 : 3306,
    password : '54c23032',
    database : 'bestbisAflwSbD71'
});

mysql.MySql_Connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n"+err);
    }
});*/

module.exports = mysql;
