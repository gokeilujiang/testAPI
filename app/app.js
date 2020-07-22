var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ExpressAPI_2');
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(__dirname + '/images'));

var port = process.env.PORT || 8080; // port番号を指定

var router = require('./route/v1/');
app.use('/api/v1/', router);



//サーバ起動
app.listen(port);
console.log('listen on port ' + port);