const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const server = express();
server.use(express.urlencoded())
server.use(express.static('public'))
// const data = fs.readFileSync('data.json', 'utf-8')
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

server.use(express.json())

// server.use((req,res,next)=>{
//     console.log(req.method , req.ip ,new Date(), req.hostname ,req.get('Host'), req.get('User-Agent'))
//     next()
// })

// server.get("/", (req, res) => {
    // res.send("<h1>Durgesh Bhai</h1>")
    // res.sendStatus(401);
    // res.sendFile(__dirname+"/index.html");
    // res.status(200).send("<h1>Durgesh Bhai</h1>")
//     res.json(data)
// })

//1) morgon or below
// server.use(morgan('default'))
server.use(morgan('dev'))


const auth =(req,res,next)=>{
    // if(req.body.password=="123"){
		console.log(req.query.password)
    if(req.query.password=="123"){
        next()
    }
    else{
        res.sendStatus('401')
    }
    next()
}

// server.use(auth)
server.get("/",auth, (req, res) => {
    res.json({type:'get'});
})
// server.get("/product/:id",auth, (req, res) => {
//     console.log("param:" , req.params)
//     res.json({type:'get'});
// })
server.post("/", auth, (req, res) => {
    res.json({type:'post'});
})
server.delete("/", (req, res) => {
    res.json({type:'delete'});
})
server.put("/", (req, res) => {
    res.json({type:'put'});
})
server.patch("/", (req, res) => {
    res.json({type:'patch'});
})

server.listen(3000, () => {
    console.log("Server started ...")
})