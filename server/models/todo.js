const mongoose = require("mongoose");

var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// var newTodo = new Todo({
// 	text: "Learn all about Node",
// 	completed: false,
// 	completedAt: 651651
// });

// newTodo.save().then((doc) => {
// 	console.log("Saved Todo", doc)
// }, (e) => {
// 	console.log("Unable to save Todo", e);
// });

module.exports = {Todo};