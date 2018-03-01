const mongoose = require("mongoose");

var User = mongoose.model("User", {
	userName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
	});

// var newUser = new User({
// 	userName: "RabidOcelot",
// 	email: "diaryofdamadman@gmail.com"
// });

// newUser.save().then((doc) => {
// 	console.log("User successfully saved", JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log("User not saved", e)
// })

module.exports = {User};