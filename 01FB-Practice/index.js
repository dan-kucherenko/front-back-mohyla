const express = require('express');

const server=express();
const  PORT = 8888;
server.listen(PORT);
console.log('Server is running on port '+PORT);

server.get('/', function(req, res){
    console.log("Dear client connected");
    res.send("Корінь сайту");
});


server.use('/k*', function(req, res){
    console.log("Dear client connected");
    res.send("Шаблон з зірочкою");
});

server.get('/a?q', function(req, res){
    console.log("Dear client connected");
    res.send("Шаблон зі знаком запитання");
});

server.get('/catalog/:category/:id',
    function(req, res){
        console.log("Dear client connected");
        res.send("Category: "+req.params.category+
            "<br/><br/>ID: "+req.params.id);
    });

server.get('/*', function(req, res){
    console.log("Dear client connected");
    res.send("Ви хочете в такий спосіб відповісти на всі запитання? Отримуйте Error 404");
});
