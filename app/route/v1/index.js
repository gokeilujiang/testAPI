var express = require('express');
// ルーティングするで
var router = express.Router();

// routerにルーティングの動作を書いてく
router.get('/',function(req,res){
    res.json({
        message:"Hello,world"
    });
});

router.use('/article', require('./article.js'));
router.use('/user', require('./user.js'));

//routerをモジュールとして扱う準備
module.exports = router;