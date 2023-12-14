// const {sub ,div} = require('./base.js'); //module.exports = {sub ,div};
// console.log(sub(7,2));
// console.log(div(8,2));

// const op = require('./base') 
// console.log(op.usub(7,2));    //exports.usub = sub;

import * as op from './base.js'
console.log(op.sub(7,2));    //exports.usub = sub;
console.log( op.default(7,2) );    //exports.usub = sub;

// import {sub ,div} from './base.js';
// console.log(sub(7,2));
// console.log(div(8,2));






// {
// 	"type":"commonjs"
// }