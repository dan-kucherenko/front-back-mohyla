let express = require('express');

let server=express();
server.listen(8888);
console.log('Server is running on port 8888');


server.use(express.static(__dirname));

server.get('/', function(req, res){
    res.sendFile(__dirname+"/forma.html");
});

server.get('/reply', function(req, res){
    res.writeHead(200,
        {"Content-type": "text/html; charset=utf-8"});
    res.write("Вітаємо Вас, "+req.query.inp);
    res.write("<br/>");
    res.write("<br/>");
    res.write("Дякуємо за співпрацю з нашою формою!");
    res.end();
});
