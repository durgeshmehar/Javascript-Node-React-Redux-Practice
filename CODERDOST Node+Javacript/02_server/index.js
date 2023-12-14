
// REquest body
/*
const http = require('http');
const fs = require("fs");

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;
const sendData = fs.readFileSync('data.json', 'utf-8');

    // const data = { age: 5 };


const server = http.createServer((req, res) => {

	// console.log("URL BRO ",req.url, req.method)
	
	if (req.url.startsWith('/product')) {
		const id = req.url.split('/')[2];
		
        if (id !== "") {
			const product = products.find(p => p.id == (+id));
            console.log(product)
            res.setHeader('Content-Type', 'text/html');
            let modifiedIndex = index.replace("**url**", product.thumbnail).replace("**title**", product.title).replace("**price**", product.price).replace("**rating**", product.rating);
			res.setHeader('name', 'request from durgesh')
            res.end(modifiedIndex);
            return;
        }
    }
    
	
    switch (req.url) {
		case "/":
			res.setHeader('Content-Type', 'text/html');
            res.end(index);
            break;
		case "/api":
            console.log("main :",req.method)
            if (req.method === "GET") {
                res.setHeader('Content-Type', 'application/json')
                res.write('<p>This is API request from GET.</p><br>');
                res.end( sendData );
            }
            else {
                res.setHeader('Content-Type', 'application/json')
                res.write('<p>This is API request from POST.</p>');
                res.end(JSON.stringify(data));
            }
            break;
            default:
                res.writeHead(400);
                res.end();
            }
            // res.setHeader('Content-Type', 'application/json')
            // res.setHeader('Content-Type','html')
                
            })
    server.listen(5173)

    */
//request query

const http = require('http');
const fs = require("fs");
const url =require('url');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const server = http.createServer((req, res) => {

    // const parsedUrl = url.parse(req.url, true);
	// const path = parsedUrl.pathname;
	// const query = parsedUrl.query;
    // const method = req.method;
    // console.log("URL",req.url," :parsedUrl :",parsedUrl);
	// console.log("Query :", parsedUrl.query )
	
    
    // if (path.startsWith('/product') && method === 'GET') {

    //     const id = parsedUrl.query.id;
        
    //     if (id !== "" && id!=undefined) {
    //         const product = products.find(p => p.id == (+id));
    //         res.setHeader('Content-Type', 'text/html');
    //         let modifiedIndex = index.replace("**url**", product.thumbnail).replace("**title**", product.title).replace("**price**", product.price).replace("**rating**", product.rating);
    //         res.end(modifiedIndex);
    //         return;
    //     }
    //     else{
    //         res.write('<p>Please Enter request in this format : localhost:5173/product/?id=4</p><br>')
    //         res.end();
    //     }
    // }
    
    // switch (req.url) {
    //     case "/":
    //         res.setHeader('Content-Type', 'text/html');
    //         res.end(index);
    //         break;
    //     case "/api":
    //         console.log("main :",req.method)
    //         if (req.method === "GET") {
    //             res.setHeader('Content-Type', 'application/json')
    //             res.write('<p>This is API request from GET.</p><br>');
    //             res.end(JSON.stringify(data));
    //         }
    //         else {
    //             res.setHeader('Content-Type', 'application/json')
    //             res.write('<p>This is API request from POST.</p>');
    //             res.end(JSON.stringify(data));
    //         }
    //         break;
    //         default:
    //             res.writeHead(400);
    //             res.end();
    //         }
    //         // res.setHeader('Content-Type', 'application/json')
    //         // res.setHeader('name', 'request from durgesh')
    //         // res.setHeader('Content-Type','html')
            
        })
server.listen(5173)
