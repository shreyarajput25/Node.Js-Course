//we need to read large text filke and send it to a client

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) =>{
    //solution 1 (problem cuz node will be loading the whole file in the memory. So, this is not a good solution)
    // fs.readFile('test-file.txt', (err, data) =>{
    //     if (err) console.log(err);
    //     res.end(data);

    // });
    //end of sol 1


    //solution 2: Streams
    //problem readbale steam is faster than repsonse stream- back pressure
    //receiving speed is higher than the respponse stream
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // //when we are done sending the data and finished reading the file..need to handle it
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found");
    // });
    //end of sol 2


    //solution 3 
    //use pipe handles the speed of data coming in and going out, and solves back pressure problem
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //readable.pipe(writeableDes)  --- this is where data can come from
});

server.listen(8000, '127.0.0.1', () => {
    console.log('LIstening.....');
});