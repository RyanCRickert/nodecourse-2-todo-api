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

	// db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
	// 	console.log(result);
	// })

	// db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
	// 	console.log(result);
	// })

	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndDelete({
	_id: new ObjectID("5a98384e1c7c833cb8fe4b2f")
	}).then((result) => {
		console.log(result);
	})

	db.collection('Users').deleteMany({name: "Ryan"}).then((result) => {
		console.log(result);
	})

	// client.close();
});