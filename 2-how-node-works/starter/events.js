const EventEMitter = require('events');
const http = require('http');



//EventEMitter super and Sales parent class
class Sales extends EventEMitter {
    constructor(){
        super(); //inherit super class
    }
};

const myEmitter = new Sales();
//observer pattern
myEmitter.on('newSale', () =>{ //creating a listener in case of the event newSAle
    console.log('There was a new sale')
});

myEmitter.on('newSale', () =>{ //creating a listener in case of the event newSAle
    console.log('JOnas')
});


myEmitter.on('newSale', stock =>{ //creating a listener in case of the event newSAle
    console.log(`There are now ${stock} items left in stock.`)
});
//multiple listeners will synchronously
myEmitter.emit('newSale', 9); //emiter for event new sale and 9 is the argument


////////////

const server = http.createServer();

server.on('request', (req, res) =>{
    console.log('Request received.');
    console.log(req.url);
    res.end('Request received');
});

server.on('request', (req, res) =>{
    console.log('Another received');
    res.end('Another received');
});

server.on('close', (req, res) =>{
    res.end('server closed');
});

server.listen(8000, '127.0.0.1', () => { //start server
    console.log('waiting for reqt ...');
});