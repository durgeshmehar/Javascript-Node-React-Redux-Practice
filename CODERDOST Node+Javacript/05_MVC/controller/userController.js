const fs = require('fs')
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;

exports.getAllUsers = (req, res) => {
    res.json(users);
}
exports.getSingleUser = (req, res) => {
    const id = +req.params.id;
    const singleUser = users.find(p => p.id === id);
    res.json(singleUser);
}
exports.createUser = (req, res) => {
    users.push(req.body);
    res.status(201).json(req.body);
}
exports.updataUser = (req, res) => {
    const id = +req.params.id;
    const singleUser = users.findIndex(p => p.id === id);
    users.splice(singleUser, 1, { ...req.body, id: id })
    res.status(201).json(singleUser);
}
exports.replaceUser = (req, res) => {
    const id = +req.params.id;
    const singleUser = users.findIndex(p => p.id === id);
    const user = users[singleUser];
    users.splice(singleUser, 1, { ...user, ...req.body })
    res.status(201).json(singleUser);
}
exports.deleteUser = (req, res) => {
    const id = +req.params.id;
    const singleUser = users.findIndex(p => p.id === id);
    const user = users[singleUser];
    users.splice(singleUser, 1)
    res.status(201).json(user);
}
exports.frontpage = (req, res) => {
    res.sendFile(__dirname+"/index.html")
}