
// const fs = require('fs');
// const data = fs.readFileSync('temp.txt', 'utf-8');
// console.log(data);

// fs.readFile('temp.txt', 'utf-8', (err, data) => {
// 	  console.log(data);
// });
// console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

//2) Asynchrnously get request,
// fs.readFile('temp.txt','utf-8',(err,txt)=>{console.log(txt)});

// const commandData =process.argv.slice(2);

// console.log("Inputed Data" ,commandData);

//3) Install Express
// const express = require("express");

// const server  = express();
// server.listen(3000);
//4) OS modules
// const os = require("os");

// console.log(os.platform())
// console.log(os.arch())
// console.log(os.cpus());
// console.log(os.totalmem())
// console.log(os.freemem())
// console.log(os.networkInterfaces())
// console.log(os.userInfo())
// console.log(os.uptime())

//5) Command line ls ,dir use

// const { exec } = require("child_process");
// const fs = require("fs")

// exec('dir' ,(error ,data )=>{
//     if(error){
//         console.log(`error commmand : ${error.message}`);
//     }

//     fs.writeFile('output.txt' ,data ,(error)=>{
//         if(error){
//             console.log(`error to write : ${error.message}`);
//             return;
//         }
    
//         console.log(`Succesfully writeen .`);
//     })
// } )

const http = require('http')
const fs = require('fs')

const data = fs.readFileSync('data.json', 'utf-8');
const server = http.createServer((req ,res)=>{
	// res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Type', 'application/json');
	res.end(data);
});

server.listen(3000,()=>{
	console.log('server is running on port 3000');
})

