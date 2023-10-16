// CORE MODULES

// requiring File System Module
const fs = require('fs');

//requiring HTTP Module for networking capablities
const http = require('http');

const url = require('url');

// 3d party module from NPM Registry
const slugify = require('slugify');

// OWN(custom) MODULES
const replaceTemplate = require('./modules/replaceTemplate');

///////////////////////////////////////////////
// FILES

// Blocking, synchronous way
//
// reading File
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about Avocardos : ${textIn}. \nCreated on ${Date.now()}`;

// writing in the file
// // No need to store the text in the varaible while writing in the file because it doesn't return anything meaningful.
// const writeFileSyncTest = fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
// error handling
//   if (err) return console.log("ERROR! ");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log(`Your file has been writeen 😊.`);
//       });
//     });
//   });
// });
// console.log("Will read file! ");

///////////////////////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
console.log(slugify('Fresh Avocados', { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-typte': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Proudct page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-typte': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    //  Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello wrold',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
