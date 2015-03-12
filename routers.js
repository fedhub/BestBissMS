var express    = require('express');
var router     = express.Router();
var functions  = require('./functions');
var server     = require('./server');

router.get('/', function(req, res){
    res.render('index');
});

router.get('/menu', function(req, res){
    //functions.get_menu(req, res);
    res.render('menu');
});

router.post('/get-menu',function(req,res){

    functions.get_menu(req, res);

});

module.exports = router;


/*router.post('/login',function(req,res){
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});*/

