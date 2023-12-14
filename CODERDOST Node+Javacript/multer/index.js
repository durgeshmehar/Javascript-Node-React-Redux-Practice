const express = require('express')
const app = express();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

let db = [];

app.use(express.static('uploads'))
app.use(express.static('public'))

app.post('/image', upload.single('avatar'), function (req, res, next) {
	console.log("file is :", req.file);
	console.log("data is :", req.body);
	fs.rename(`uploads/${req.file.filename}`, `uploads/${req.body.fullname}`, (err) => {
		if (err) throw err;
		else {
			db.push(req.body.fullname);
			res.send(`<img width="50%" src="/${req.body.fullname}">`)
		}
	})
})

app.get('/images', (req, res) => {
	let singlefile = "";
	db.forEach(image => {
		singlefile += `<img width="50%" src="/${image}">`
	})
	res.send(singlefile)
})

app.listen(3000, () => {
	console.log("Server started at port 3000")
})