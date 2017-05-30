var express = require('express');
var app = express();
var bodyparser = require('body-parser');

// app.set('port',3000);
app.use(express.static('public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());

//app.listen(3000,function(){
app.listen(process.env.PORT,function(){    
    console.log('Example app listening on port 3000');
});