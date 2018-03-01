// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
	if (err) {
		return console.log("Unable to connect to MongoDB server");
	}
	console.log("Connected to MongoDB server");
	const db = client.db("TodoApp")

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5a98368b1c7c833cb8fe4a9d")
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// 	}, {
	// 		returnOriginal: false
	// 	}).then((result) => {
	// 		console.log(result);
	// 	})

	db.collection('Users').findOneAndUpdate({
		_id: ObjectID("5a981e3b5357c21c881deb00")
	}, {
		$set: {
			name: "Ryan"
		},
		$inc: {age:1}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	})

	// client.close();
});