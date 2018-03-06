const {ObjectId} = require("mongodb");
const jwt = require("jsonwebtoken");

const {Todo} = require("./../../models/todo");
const {User} = require("./../../models/user");

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
	userName: "UserOne",
	_id: userOneId,
	email: "user@example.com",
	password: "userOnePass",
	tokens: [{
		access: "auth",
		token: jwt.sign({_id: userOneId, access: "auth"}, process.env.JWT_SECRET).toString()
	}]
}, {
	userName: "UserTwo",
	_id: userTwoId,
	email: "user2@example.com",
	password: "userTwoPass",
	tokens: [{
		access: "auth",
		token: jwt.sign({_id: userTwoId, access: "auth"}, process.env.JWT_SECRET).toString()
	}]
}]

const todos = [{
	_id: new ObjectId(),
	text: "First test todo",
	_creator: userOneId
}, {
	_id: new ObjectId(),
	text: "Second test todo",
	completed: true,
	completedAt: 333,
	_creator: userTwoId
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		Todo.insertMany(todos);
	}).then(() => done());
}


const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo])
	}).then(() => done());
};
module.exports = {todos, populateTodos, users, populateUsers};