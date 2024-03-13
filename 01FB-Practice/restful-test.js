let express = require('express');

let server=express();
server.listen(8888);
console.log('Server is running on port 8888');


server.use(express.static(__dirname));

let arr=[10,20,30];
server.get('/', function(req, res){
    res.send(JSON.stringify(arr));
});

server.post('/:elem', function(req, res){
    // we should use req.body 
    arr.push(req.params.elem); // need to use req.body
    res.writeHead(200,{"Content-type": "text/html"});
    res.end();
});

server.delete('/:elem', function(req, res){
    arr.pop(); // need to use delete for particular element
    res.writeHead(200,{"Content-type": "text/html"});
    res.end();
});
