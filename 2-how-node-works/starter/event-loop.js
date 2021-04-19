const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
//process.env.UV_THREADPOOL_SIZE =1; //set thread pool threads to 1

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"))

fs.readFile('test-file.txt', () => {
    console.log('I/O finsihed');
    console.log('------');

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 2 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));
//to run in event loop time and immediate need to be under a callback.

    process.nextTick(() => console.log("process.nextTick")); //appears first as it is executed after every phae

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    {//example of thread loop..
        console.log(Date.now() - start, "password encrypted");
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    {//example of thread loop..
        console.log(Date.now() - start, "password encrypted");
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    {//example of thread loop..
        console.log(Date.now() - start, "password encrypted");
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    {//example of thread loop..
        console.log(Date.now() - start, "password encrypted");
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
    {//example of thread loop..
        console.log(Date.now() - start, "password encrypted");
    })
});



console.log("Hello from the top-level code"); //top level code and should run first