const {ObjectId} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// var id = "5a995b8ed437f82238b580044";

// if (!ObjectId.isValid(id)) {
// 	console.log("ID not valid");
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log("Todos", todos);
// })

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log("Todos", todo);
// })

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log("Id not found")
// 	}
// 	console.log("Todo By Id", todo);
// }).catch((e) => console.log(e));

User.findById("5a9860b5049bab45e07727dd").then((user) => {
	if(!user) {
		return console.log("User does not exist");
	}
	console.log("User By Id", user);
}).catch((e) => console.log(e));