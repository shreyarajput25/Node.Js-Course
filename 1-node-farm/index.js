const fs = require('fs'); //read file system

const http = require('http');
const url = require('url');


const slugify = require('slugify'); //reuqiring 3rd party apps
//slugify - slug: last part of the string (unique string) in the url

console.log(slugify('Fresh Avocados', {lower: true}));


const replaceTemplate = require('./modules/replaceTemplate');
//export module. In reuqire '.' points to current location



//////////////
//FILES

// const txt = fs.readFileSync('../txt/input.txt', 'utf-8'); 
// console.log(txt);

// const textOut = `this is: ${txt}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('../txt/output.txt', textOut);
// console.log('File Written!') ;
// //we did above in the synchronous way

// //read wrtie files in ansync way (Non Blocking) and need callback func for it


// fs.readFile('../txt/start.txt', 'utf-8', (err, data) =>{
//     console.log(data);
// } )
// //callback will print only when the process is finished



// fs.readFile('../txt/start.txt', 'utf-8', (err, data1) =>{
//     if (err) return console.log(err);
//     fs.readFile(`../txt/${data1}.txt`, 'utf-8', (err, data2) =>{
//         console.log(data2);
    
//         fs.readFile('../txt/append.txt', 'utf-8', (err, data3) =>{
//             console.log(data3);
//             fs.writeFile('../txt/final.txt', `${data2}\n${data3}`,'utf-8', err=>{
//             console.log('Your file is ready')
//             });
//       });
//     });
// });
// console.log('Will read file');


////////////////////////////////////////////
//SERVER




const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
//we use sync because we are reading file only one time in the begining


const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs);

///reading templates in the begning and storing it in the memory so that
///we don't have to read again and againroductData
const TempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8')
const TempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8')
const TempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8')


const server = http.createServer((req, res) => {
    
    const { pathname, searchParams } = new URL(req.url, 'http://127.0.0.1/');
    console.log(pathname)
    const query = searchParams.get('id');


    // Overview Page
    if (pathname === '/' || pathname === '/overview') 
    {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardHTML = dataObj.map(el => replaceTemplate(TempCard, el)).join('');//join converts array to string
        output = TempOverview.replace('{%PRODUCT_CARDS%}', cardHTML);

        res.end(output);
        res.end('This is the OVERVIEW');
    }

    // Product page
    else if (pathname === '/product')
    {    
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query];
        const output = replaceTemplate(TempProduct, product);
        res.end(output);
        res.end('This is the PRODUCT');
    }


    //API
    else if (pathname === '/api')
    {
    
        res.writeHead(200,     //status code
            {
            'Content-type': 'application/json' // json header
            });
        res.end(data)
    }
  

    ///Not FOUND
    else{
        res.writeHead(404,     //status code
            {
           'Content-type': 'text/html', // header (header and status code sent before the response)
           'my-own-header': 'hello-world'
           });
        res.end('<h1>Page note found!</h1>');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');

});

///simple routing

