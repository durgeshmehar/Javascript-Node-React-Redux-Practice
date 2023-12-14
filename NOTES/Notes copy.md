# Export /Import

package.json = {
	"type":"commonjs"
}

	1) const {sub ,div} = require('./base.js');  // module.exports = {sub ,div};
		console.log(sub(7,2));
	2) const op = require('./base') 
		console.log(op.usub(7,2));    // exports.usub = sub;

package.json = {
	"type":"module"
}
	3) import {sub ,div} from './base.js';  //export {sub ,div} or export function sub(a,b){return a-b;}
		console.log(sub(7,2));

	4) import * as op from './base.js';  //export {sub ,div};
		console.log(op.usub(7,2));    //exports.usub = sub;

	5) import * as op from './base.js'  //export function sub( a , b){
		console.log(op.sub(7,2));      //export function div( a , b){ 
		console.log( op.default(7,2) ); //export default function multiply(a, b) {


#(NOTE : exports.usub = sub; (named export) )


1) Server Rendered :- Mixed HTML ,Javscritpt + DATA on server
2) Client Rendered :- Mixed Fronted + Data on Client machine (ex. React js)

#```````IMP METHOD ```````````

 1. JSON.parse() X JSON.stringify()
 #NODE
 - req.url.split('/')[2] 
 #EXPRESS
 - req.query.id , req.body.id
 #MVC
 - express.Router();
 #REACT_WITH_EXPRESS
 - server.use(cors())
 #PATH 
 - path.resolve(__dirname ,process.env.PUBLIC_DIR)
 - path.resolve(__dirname ,'..','/index.js');
 #SSR
 - server.use(express.urlencoded());

# [1] ` NODE SERVER `
<h1> <span style="color:yellow"> NODE SERVER </span></h1>
(Access URL of website after enter by User in two ways)
	1. req.url #(checking entry point use switch case with "req.url.startsWith("/product")")
	   const id = req.url.split('/')[2];  #("http://localhost:5173/product/4" for id query)
    2. const url =require('url');  #(checking entry point "path.startsWith("/product")")
		const parsedUrl = url.parse(req.url, true);
		const path = parsedUrl.pathname;
		const query = parsedUrl.query;
		const id = query.id;      #(use "http://localhost:5173/product/?id=4" for id query)

<p style="color:red"> 

```
const http = require('http');

const server = http.createServer((req, res) => {
    
	//res.setHeader('Content-Type', 'application/json')
	// res.setHeader('name', 'request from durgesh')
	// res.setHeader('Content-Type','html')
	cl=>("URL BRO ",req.url, req.method)

    switch (req.url) {
		case "/":
			res.setHeader('Content-Type', 'text/html');
            res.end(index);
            break;
		case "/api":
            cl=>("main :",req.method)
			res.setHeader('Content-Type', 'application/json')
			res.end( sendData );
            break;
		default:
			res.writeHead(400);
			res.end();
	}
})

server.listen(5173)
 ```
</p> 


# [2]`````` EXPRESS SERVER ```````

```Create Server``` 
const express = require('express')
const server = express();

server.get('/', (req, res) => {
	res.send('Hello World')
})
server.listen(3000)

```MiddleWare```
Its a function that have access of response obj & request obj & next fun in req-res cycle.
DO - Authentication , Logging , Parsing , Error Handling
#Types of MiddleWare:
1. Application Level MiddleWare
server.use((req,res,next)=>{
    console.log(req.method , req.ip ,new Date(), req.hostname ,req.get('Host'), req.get('User-Agent'))
    next()
})

2. Router Level MiddleWare

const auth = (req,res,next)=>{
	if(req.query.password === '123'){
		next()
	}else{
		res.send('No Auth')
	}
}
server.get('/user',auth,(req,res)=>{
	res.send('User Page')
})

3. Built In MiddleWare
` server.json(express.json()) ` : Parse the incoming req with json payload
` server.urlencoded(express.urlencoded()) ` : Parse the incoming req with urlencoded payload
` server.static(express.static('public')) ` : Serve static files (index.html file in public dir > preference than server.get('/'))

4. Third party MiddleWare
Extra functionality : pass cookie or raw data 

$npm i morgan
` server.use(morgan('dev'))  ` or ` server.use(morgan('default')) ` 
O/P : GET /?password=123 304 8.571 ms - -

#Way of gets data from req
1. req.query (http://localhost:3000/user?password=123)
	const auth =(req,res,next)=>{
		if(req.query.password=="123") next();
		else res.send("No Auth")
	}

2. req.body (ex.form  In postman :body > raw > json >{ "password": "123" }})
	const auth =(req,res,next)=>{
		if(req.body.password=="123") next();
		else res.send("No Auth")
	}

3. req.params (http://localhost:3000/product/3)
	server.get("/product/:id",auth, (req, res) => {
		console.log("param:" , req.params)  
	})
	O/P: param: { id: '3' }

#``````` REST API (Representational State Transfer) ```````````
It is an architectural style defines set of rule to used for create web services.
RESTfUl web service identified by URLs & HTTP methods(GET,POST,PUT,DELETE).
Representational = resources are represented by URIs
State Transfer = client and server exchange representations of resource state


```` CRUD OPERATION``````

// 1) Read Operation( GET /products)   C R U D
server.get("/products", (req, res) => {
    res.json(products);
})
// Just to Test Public
server.get("/jsondata", (req, res) => {
    res.sendFile(__dirname + '/public/data.json');
})

// 1.2)Read Operation( GET /products/:id )
server.get("/products/:id", (req, res) => {
    const id = +req.params.id;
    const singleProduct = products.find(p => p.id === id);
    res.json(singleProduct);
})

// 2) Create (write) product
server.post("/products", (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body);
})

//3) UPDATE (put) Only show input property ->full Update
server.put("/products/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1, { ...req.body, id: id })
    res.status(201).json(productIndex);
})

//3.2) UPDATE (patch) replaced input property(Partialy update)
server.patch("/products/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, { ...product, ...req.body })
    res.status(201).json(productIndex);
})

// 4) DELETE

server.delete("/products/:id", (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1)
    res.status(201).json(product);
})

#``````` MVC(MODEL VIEW CONTROLER) STRUCTURE ```````````
MVC is a software design pattern for developing web application.
M = Model (DataBase) , V = View (UI) , C = Controller (Logic)

1) Controller > productController.js 
		exports.getSingleProduct = (req, res) => {
		const id = +req.params.id;
		const singleProduct = products.find(p => p.id === id);
		res.json(singleProduct);
		}

2) routes > product.js
		const express = require('express');
		const router = express.Router();
		const productController = require('../controllers/productController');
		
		router.use((req, res, next) => {
			console.log("Middleware Called ");
			next();
		})

		router
		.get('/', productController.getProduct)
		.get("/:id", productController.getSingleProduct)
		.delete("/:id", productController.deleteProduct)
		module.exports = router;

3) index.js >
		const ProductRouter = require('./routes/product');
		server.use(express.json())
		server.use('/products',ProductRouter)

#``````` MONGODB ```````````

(NOSQL Structure)
DBServer (Provide service) > DB > Collection > Document (JSON data)
(SQL Structure)
DBServer > DB > Table > Tuple (Excel data)

`` JSON vs BSON ``
JSON : JavaScript Object Notation (Human Readable) 
BSON : Binary JSON( Efficent to storage & access )
``---------------------------------------------------------------``
To create Local Database: Run '$mongod' in cmd


[ How to run : * cmd > enter mongod  ,* open mongodb compass ,* open mongosh shell ]
############## MONGODB COMMAND  ###############
open mongosh (mongo shell)
1) $ show dbs , $ use dbs_name , $ show collections , $ db.collections_name.find()
2) $ use eccomerce ( automatically create db if not exist) 
#Insert command
3.1) $ db.products.insertOne({name:"iphone 12 pro max",price:120000})
3.2) $ db.products.insertMany([ {} ,{}])
#find command
4.1) $ db.products.find()    O/P:- [{ _id: ObjectId("6521b80c8b"), name: 'i-phone' } ]
4.2) $ db.products.findOne({title: "Infinix INBOOK"});
4.3) $ db.products.findOne({title: {$eq:"Infinix INBOOK" }});
4.4) $db.products.find({rating:{$gt:3}})
4.5) $db.products.find({rating:{$gte:3} ,id :{$lt:3}} ) or ..find({$and:[{rating:{$gte:3}} ,{id :{$lt:3}} ]}) 
     (also you can use 'or' )
4.6)  $db.products.find({rating:{$gt:3}}).sort({"price":1}).limit(3) //1 =asc ,-1 =desc
4.7) Projection :- $db.products.find({rating:{$gt:3}} , {'title':1 , 'price':1 , '_id':0})

#countDocuments command
5) $ db.products.countDocuments({'price' : {$gt: 10}}) //count

#UPDATE COMMAND
6.1) $ db.products.updateOne({title: "Infinix"},{$set:{price: 50000}})
6.2) $ db.products.updateMany({title: "Infinix"},{$set:{price: 50000}})
6.3) $ db.products.updateOne({id: 99},{$set:{price: 50000}} ,{upsert:true})   ```UPSERT COMMAND```

#REPLACE COMMAND(clear all data and store new data)
7) $ db.products.replaceOne({id: 9},{price:120000})

#DELETE COMMAND
8.1) $ db.products.deleteOne({id: 9})
8.2) $ db.products.deleteMany({price: 99})

````````` MONGODB ATLAS & CONNECT & ENV FILE `````````````

MONGODB ATLAS (Cloud database service by mongodb) 
1) Create Cluster > Connect > 

#Connection Through different ways :
1. Shell 2.Compass 3. Drivers 4. VS CODE  

1. SHELL (Open CMD & Enter)
$ mongosh "mongodb+srv://cluster0.fbgi2nq.mongodb.net/ecomDatabase" --apiVersion 1 --username durgeshmehar 
ecomDatabase > db.products.insertOne({name:"iphone 12 pro max",price:120000})

2. COMPASS (Open Compass & Enter)
$ mongodb+srv://durgeshmehar:durgeshpassword@cluster0.fbgi2nq.mongodb.net/

````````` ENV FILE `````````````
( Temporary Creation ) 
> DB_PASSWORD = "durgeshpassword" node index.js
> process.env.DB_PASSWORD

( Permanent Creation )
> npm i dotenv
---create .env file in root dir( DB_PASSWORD = "durgeshpassword")
---index.js enter >> require('dotenv').config()
To use enter >> process.env.DB_PASSWORD


#`````````````MONGOSH `````````````
It is Object data modelling library for MongoDB & Node.js.
It is Client provides a straight-forward, schema-based interface for interact to mongoDB database to work with model in Nodejs.

```index.js```
> npm i mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/ecom');
	console.log("Connected to DB");
}

```model/product.js```
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
      id :Number,
      title: { type: String},
      description: String,
      price: { type: Number} 
})
exports.Product = mongoose.model('Product', productSchema);

```controller/productController.js```
const model = require('../model/product');
const Product = model.Product;

exports.createProduct = (req, res) => {
    const product = new Product( req.body );
	product.save().then((data)=>{
        res.status(201).json(data)
	}).catch((err)=>{
		res.status(201).json(err);
	})
}

exports.getAllProducts = async (req, res) => {
	const products = await Product.find();
    res.json(products);
}

#`````` Mongosh Command ```````#
support all previous mongodb command
#find
const product = await Product.find({price :{ $gt:100}})
.findOne({}) , .findById({id}) =findOne({_id:id}) , findOneAndReplace( {_id:id }, req.body ,{new:true} ) = put,
.findOneAndUpdate({price: price } , req.body ,{new:true} ) = patch  ,


#````````` React With Mongoose Database ```````````#
> npm i axios
> npm i cors (Enable cross origin resource sharing between two different server react & localhost)
import axios from 'axios'
const cors = require('cors')

server.use(cors());
const [products, setProducts] = useState([]);

useEffect(()=>{
   const res = await axios.get('http://localhost:3000/products')
   setProducts(res.data)
},[])

```--------------------send request from react to mongo-----------`
const handleSubmit = (e)=>{
	e.preventDefault();
	addProduct(product);
}
const addProduct = async(product)=>{
	const res = await axios.post('http://localhost:3000/products',product);
}
```---------------------delete request from react to mongo-----------`

const handleSubmit = async(_id)=>{
	const res = await axios.delete(`http://localhost:3000/products/${_id}`);
	if(res.data._id) setProduct.filter(p=>p._id !== res.data._id)
}
#```` Build react Project 
> npm run build
build > npm i -g http-server
build > http-server

#```` API in React used in Express ````
Add build file in express root
$ server.use(express.static('build'))

//To using the addPage form of react in express server
$server.use('*', (req, res) => {
    res.sendFile( path.resolve(__dirname  ,"build","index.html"))
})

#````````` Vercel Configuration `````````````
{
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      },
      {
        "src": "build/**",
        "use": "@vercel/static"
      }
    ],
    "routes": [
      {
        "src": "/products",
        "dest": "index.js"
      },
      {
        "src": "/products/(.*)",
        "dest": "index.js"
      },
      {
        "src": "/add",
        "dest": "build/index.html"
      },
      {
        "src": "/",
        "dest": "build/index.html"
      },
      {
        "src": "/assets/(.+)",
        "dest": "build/assets/$1"
      },
      {
        "src": "/(.+)",
        "dest": "build/$1"
      }
    ]
 
  }


#````````` SERVER SIDE RENDERING `````````````
Web pages are render on server before sending them to the browser.
Server generate the HTML,CSS & JS for web page & send it to browser as complete HTML.
BEST for performance & SEO.

template as ejs(embedded JavaScript template) , handlebars
>npm i ejs

>[Pages/view] (store template which generate html)
>> add.ejs (template)
#`` ejs ``#
<% %> (Control flow)
<%= %> (Give output)

ex. <% for( let product of products) { %>
      <% if(product) { %>
		<h5 ><%= product.title %> </h5>
		<img  src="<%= product.thumbnail %> " />
	  <% } %>
	<% } %>

```To Render Template in ejs 3 method`
1) ejs.compile()

const template = `
  <h1><%= title %></h1>
  <p><%= content %></p>
`;

const compiledTemplate = ejs.compile(template);

const data1 = { title: 'Page 1', content: 'This is page 1.' };
const data2 = { title: 'Page 2', content: 'This is page 2.' };

const html1 = compiledTemplate(data1);
const html2 = compiledTemplate(data2);

2) ejs.render()

const template = `
  <h1><%= title %></h1>
  <p><%= content %></p>
`;

const data = { title: 'My Website', content: 'Welcome to my website!' };

const html = ejs.render(template, data);

3) ejs.renderFile()

exports.getAllProductsSSR = async (req, res) => {
    const products = await Product.find();
    ejs.renderFile( path.resolve(__dirname ,'../pages/index.ejs') , {products:products} , function(err ,str){
        res.send(str);
    });
}

#`` make a route``
productRouter
	.get("/", controller.frontpage)
	.get("/ssr", controller.getAllProductsSSR)
	.get("/add", controller.getAddform)
exports.router = productRouter;

//use can access ssr throgh url :http://localhost:3000/products/ssr
```` To update ssr page as delete ,update something in database ,everytime page loads up &
u have to update page by using HTML event(DOM programming) not using any react event possible.
(u cant install axios bcause of it is simple html page not react page)
(I decided to use fetch api because it alway present at HTML to update page)  ````

---------------------------------------------------------------
<script>
  async function deleteProduct(productID){
      const response = await fetch('/products/'+productID ,{
             method:"DELETE"
      });
	  const doc = await response.json();
	  const ele =document.getElementById(doc._id);
	  ele.remove();
  }
</script>
--------------------------------------------------------------
<i class="fa fa-heart-o" onClick="deleteProduct('<%= product._id %>')"></i>
---------------------------------------------------------------
#````````HTML with fetch api `````````````
> productController.js

exports.getAddform = async (req, res) => {
    const products = await Product.find();
    ejs.renderFile( path.resolve(__dirname ,'../pages/add.ejs') , function(err ,str){
        res.send(str);
    });
}

>add.ejs
#(Data goes in form data so , we have to use body-parser)
#It encodes the form data as a string of key-value pairs separated by & characters
# ex. username=john&password=secret

// enctype="multipart/form-data" (for upload files)
// enctype="text/plain" (for text data)

<form class="form-horizontal text-left" method="POST" action="/products/" enctype="application/x-www-form-urlencoded"> 
     <p name="title" ></p>
</form>
----------------------
>index.js
server.use(express.urlencoded());  //It parse the encoded data from x-www-form-urlencoded to req.body


#``````````` AUTHENTICATION ````````````````
Authentication is the process of verifying the identity of a user.
Do not overhead the user for several times login rather than use token.

> npm i jsonwebtoken
const jwt = require('jsonwebtoken');
> controller.js > user.js
#create Token
exports.createUser = ( req, res){
	const user = new User(req.body)
	var token = jwt.sign( {email :req.body.email} ,'privateKey123');
	user.token = token;
	user.save().then((data)=>{
		res.send(201);
	}).catch((err)=>{
       res.send(401);
	})
}

#verify Token
(You must pass token in header of request from frontend)
>index.js

server.use((req,res,next)=>{
	const token = req.get('authorization').split('Bearer ')[1];
	var decoded = jwt.verify(token , 'privateKey123');
	if(decoded.email) next();
	else res.send(401);
})
//output : decoded { email:'durgesh@gmail' , iat: 1625225225 }

````Generate Private Key (Instead of 'privateKey123')``````
Require Any one Algo ( HS256 , HS384 , HS512 , RS256 , RS384 , RS512 , ES256 , ES384 , ES512 )

Browser > rsa 2048 key generation
Give #private key(Generation of token) & public Key( veryfing token)

const privateKey = fs.readFileSync(path.resolve(__dirname ,"../private.key") ,"utf-8");
const bcrypt = require('bcrypt')

exports.signup = (req, res) => {
	const user = new User(req.body);
	var token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });
    user.token = token;
--> const hash = bcrypt.hashSync(req.body.password, 10);
|	user.password = hash;
|
|	user.save().then((data) => { res.status(201).json(token) })
|	.catch((err) => { res.status(400).json(err) })	
|}
|
|#``````HASH PASSWORD (password + salt = hash)`````````````
|> npm i bcrypt
|const bcrypt = require('bcrypt')
|______
exports.login = async(req, res) => {
	try{
		const doc = await User.findOne({ email: req.body.email });
		const isAuth = bcrypt.compareSync( req.body.password, doc.password); // true / false
		if(isAuth){
			var token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });  
			doc.token = token;
			doc.save().then( (data)=>{
				res.json({token});
			}).catch((err)=>{
				res.send(401).json("Error to Store new token in Database");
			}); }
		else{
			res.send(401);
		}
	}
	catch (err) { res.send(401).json(err); }
}

#````````SORTING ````````
qeury.sort('price')  //ascending //1 //asc 
qeury.sort('-price')  //desscending //-1 //desc
// pass url : http://localhost:3000/products?sort=rating&order=1

exports.getAllProducts = async (req, res) => {
    let query = Product.find();
	if(req.query.sort ){
		const product = await query.sort({ [req.query.sort]: req.query.order }).limit(5).exec();
		res.json(product);
	}
	else{
		const products = await query;
		res.json(products);
	}
}

````Frontend react part````````
const handlesort = async(e)=>{
	cont field = e.target.value.split('.');
	const res = await axios.get(`/products?sort=${field[0]}&order=${field[1]}`)
	setProducts(res.data);
}
<select onChange= { handlesort}>
	<option value="price.desc">Price High to Low</option>
	<option value="price.asc">Price Low to High</option>
	<option value="rating.asc">Rating Low to High</option>
</select>

```Authentication in React ```
>ProductList.js (Hardcoded but take from localstorage)
axios.default.baseUrl = 'http://localhost:3000';
axios.default.headers.common['Authorization'] = 'Bearer ' + efeejfkjfkjofijwojo8u483kshw8w;

#```````````Paginatin``````````

exports.getAllProducts = async (req, res) => {
    let pagesize=4;
	let page =req.query.page;
	const template = Product.find({});
	if(req.query.sort){
		const products = await template.sort({[req.query.sort] : req.query.order}).skip(pagesize*(page-1)).limit(pagesize);
		res.json({products});
	}
	else if(req.query.page ){
		const products = await template.skip(pagesize*(page-1)).limit(pagesize);
		res.json({products});
	}
	else{
		const products = await template;
		res.json({products});
	}
}
````Frontend react part````````

const handlesort = async(page)=>{
	const res = await axios.get('/products?page='+page)
	setProducts(res.data);
}
{Array(Math.ceil(total/4))
	.fill(0)
	.map((e,i)=>
		<button onClick ={()=>{handlePage(i+1)}}> {i+1} </button>
	))
}

#````````````POPULATE( CART FUNCTIONALITY)``````````
To get data from other collection in current collection using populate in mongodb.

>model/user.js
 const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
   cart :[{type:Schema.Types.ObjectId ,ref: 'Product'}]
 })

>controller>user.js
 exports.getSingleUser = async(req, res) => {
    const id = req.params.id;
    const singleUser = await User.findById(id).populate('cart');  //you can use findOne({id:id})
    res.json(singleUser);
}

#~~~~~~~~~~~~~# ```NODE EXTRA MODULE``` #~~~~~~~~~~~~#
#Events Module(used to create & handle custom events as brodcast & receive)
(Best feature as sending event from frontend to backend & vice versa)
> event.js

const EventEmitter = require('events')
const em = new EventEmitter();
em.on('demo',(data)=>{ console.log("Demo Event :",data); })
em.emit('demo',{"msg" :"My Name is Lakhan"});

>index.js (top level Import called this)
 require('./event.js')

#Stream Module (get data in buffer format contineusly read & write data from file)
const fs= require('fs')
const rr = fs.createReadStream('./data.json')
rr.on('data',(data)=>{
  console.log({data})  // give buffer data
})
rr.on('end',(data)=>{
   console.log({data})
})

#### SOCKET ####
Permanent connection between client & server without each time request & response.

``socket.io (library to create socket)``
> npm i socket.io
(TO view data on probes in chrome write emit (sending req) in setTimeout function)
ex. setTimeout(() => {
		socket.emit('msg', { player: 'one' });
	 }, 3000);

`````` fronted part includes client frontend library to send connection request```````
<script src="/socket.io/socket.io.js">
	const socket = io();
	socket.on('connect', () => {
		console.log("Client: ", socket.id);
		socket.emit('Clientmsg', { player: 'one' });
		socket.on('serverMSG',(data)=>{	console.log("Data on Client:",{data})})
	});
</script>

// (to preserve data & view in web socket chrome we wrote emit function in setTimeout) 
>index.js
const server = express();
const app = require('http').createServer(server);
const io = require('socket.io')(app); 

io.on('connection', (socket) => {
	console.log("Connected T/f : ", socket.connected);
	console.log("Server: ", socket.id);
	socket.on('Clientmsg', (data) => { console.log("Data received at server from client :", { data }) })
	socket.emit('serverMSG',{serverData :"Request Done 👍👍❤️"})
});

app.listen(3000)