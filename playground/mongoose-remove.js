const {ObjectId} = require('mongodb');

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove({_id: "5a998f961c7c833cb8fe7b0b"}).then((todo) => {
	
// })

Todo.findByIdAndRemove("5a998f961c7c833cb8fe7b0b").then((todo) => {
	console.log(todo);
})