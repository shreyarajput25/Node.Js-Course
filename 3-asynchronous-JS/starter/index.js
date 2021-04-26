const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then()
//     .end((err, res) =>{
//         if(err) return console.log(err.message);
//         console.log(res.body.message);
//         fs.writeFile('dog-image.txt', res.body.message, err =>{
//             if(err) return console.log(err.message);
//             console.log('Random dog image to the file')
//         });

//     });
// });


//callbacks become nightmare. Called callback hell


//call back hell solved by promises
//consuming a promise means we wait for it to get back with the data
//promise as soon as it gets data it is a resolved promise.It can be fulfilled (has result) or rejected (there is an error)
//catch is for error
//then method handles fulfilled promise

const readFilePro = file =>{
    return new Promise((resolve, reject) => {//promise takes in executor
        fs.readFile(file, (err, data) =>{
            if (err) reject('I could not find that file ');
            resolve(data);
        });
    });
};


const writeFilePro = (file, data)=> {
    return new Promise((resolve, reject) => {//promise takes in executor
        fs.writeFile(file, data, err => {
            if (err) reject('I could not write that file ');
            resolve('success');
        });
    });
};

// readFilePro(`${__dirname}/dog.txt`)
//     .then(data =>{
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro('dog-image.txt', res.body.message);
//     })
//     .then(() => {
//             console.log('Random dog image to the file')
//     })
//     .catch(err => {
//         console.log(err);
//     });


//async await (better way of calling promises)

const getDogPic = async () => {
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const image = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        
        const all = await Promise.all([image, res]);

        const imgs = all.map(el => el.body.message);

        console.log(imgs);

        await writeFilePro('dog-image.txt', imgs.join('\n'));
        console.log('Random dog image to the file');

    } catch (err) {
        console.log(err);
        throw(err);
    }
    return '2: Ready';
};

// console.log('1: will get dog pics:');
// const x = getDogPic();
// console.log(x);

// getDogPic().then(x => {
//     console.log(x);
//     console.log('3:  got dog pics:');
// })
// .catch (err => {
//     console.log("error");

// });


//async automatically returns a promise

(async () => {
    try{
        console.log('1: will get dog pics:');
        const x = await getDogPic();
        console.log(x);
        console.log('3:  got dog pics:');

    } catch (err) {
        console.log("error");
    }
})();

