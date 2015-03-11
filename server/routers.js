var express    = require('express');
var router     = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

router.post('/app', function(req, res){
    var newItem = req.body.newItem;
    console.log(newItem);
});

module.exports = router;

