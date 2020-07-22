var express = require('express');
var router = express.Router();
var UserModel = require('../../models/userModel.js');

router.post('/',function(req,res){

    // モデル作成．
    var User = new UserModel();

    // データを詰め込む
    User.name = req.body.name;
    User.screen_name = req.body.screen_name;
    User.bio =  req.body.bio;

    // 保存処理
    User.save(function(err) {
        if (err){
            // エラーがあった場合エラーメッセージを返す
            res.send(err);
        } else {
            // エラーがなければ「Success!!」
            res.json({ message: 'Success!!' });
        }
    });
});

router.get('/', function (req, res) {
    UserModel
        .find()
        .then(function (users) {
            res.json(users);
        });
});

router.get('/:id', function (req, res) {

    var Userid = req.params.id;
    UserModel
        .findById(Userid,function (err,user) {
            res.json(user);
        });
});

router.put('/:id',function (req, res) {

    var Userid = req.params.id;

    UserModel
        .findById(Userid, function(err, user) {
            if (err) {
                res.send(err);
            } else {

                user.name = req.body.name;
                user.screen_name = req.body.screen_name;
                user.bio = req.body.bio;

                user.save(function(err) {
                    if (err){
                        res.send(err);
                    } else {
                        res.json({ message: 'Success!' });
                    }
                });
            }
        });
});

//routerをモジュールとして扱う準備
module.exports = router;