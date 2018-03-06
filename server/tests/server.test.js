const expect = require("expect");
const request = require("supertest");
const {ObjectId} = require('mongodb');

const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {User} = require("./../models/user");
const {todos, populateTodos, users, populateUsers} = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

describe("POST /todos", () => {
	it("should create a new todo", (done) => {
		var text = "Test";

		request(app)
			.post("/todos")
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it("should not create todo with invalid body data", (done) => {
		request(app)
			.post("/todos")
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			})

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
	});
}); //End of describe block

describe("GET /todos", () => {
	it("should get all todos", (done) => {
		request(app)
			.get("/todos")
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	})
})

describe("GET /todos/:id", () => {
	it("should return todo doc", (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it("should return 404 if todo not found", (done) => {
		var newId = new ObjectId().toHexString();

		request(app)
		.get(`/todos/${newId}`)
		.expect(404)
		.end(done);
	});

		it("should return 404 for non-object ids", (done) => {

		request(app)
		.get("/todos/123")
		.expect(404)
		.end(done);
	});
}); //End of describe block

describe("DELETE /todos/:id", () => {
	it("should remove a todo", (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.findById(hexId).then((todo) => {
					expect(todo).toBeNull();
					done();
				}).catch((e) => done(e));
			});
	});

	it("should return 404 if todo not found", (done) => {
		var newId = new ObjectId().toHexString();

		request(app)
		.delete(`/todos/${newId}`)
		.expect(404)
		.end(done);
	});

	it("should return 404 if ObjectId is invalid", (done) => {

		request(app)
		.delete("/todos/123")
		.expect(404)
		.end(done);
	})
}) //End of describe block

describe("PATCH /todos/:id", () => {
	it("should update the todo", (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = "This is some new other text";

		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: true,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(typeof res.body.todo.completedAt).toEqual("number");
			})
			.end(done)
	});

	it("should clear completedAt when todo is not completed", (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = "This is some new text";

		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				completed: false,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeNull();
			})
			.end(done)
	})
}) //End of describe block

describe("GET /users/me", () =>{
	it("should return user if authenticated", (done) => {
		request(app)
			.get("/users/me")
			.set("x-auth", users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
	});

	it("should return 401 if not authenticated", (done) => {
		request(app)
			.get("/users/me")
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
}) // End of describe block

describe("POST /users/me", () => {
	it("should create a user", (done) => {
		var email = "example@example.com";
		var password = "123abc!!";

		request(app)
			.post("/users")
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers["x-auth"]).toBeDefined();
				expect(res.body._id).toBeDefined();
				expect(res.body.email).toBe(email);
			})
			.end((err) => {
				if(err) {
					return done(err);
				}

				User.findOne({email}).then((user) => {
					expect(user).toBeDefined();
					expect(user.password).not.toBe(password);
					done();
				});
			});
	});
	
	it("should return validation error if request invalid", (done) => {
		request(app)
			.post("/users")
			.send({
				email: "fassfsf@gmail.com",
				password: "132"
			})
			.expect(400)
			.end(done);
	});

	it("should not create user if email in use", (done) => {
		var email = "user@example.com";

		request(app)
			.post("/users")
			.send({email})
			.expect(400)
			.end(done);
	});
}) //End of describe block