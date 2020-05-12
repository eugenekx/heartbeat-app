const supertest = require("supertest");
const server = require("./server");
const chai = require("chai");

chai.should();

const api = supertest.agent(server);

describe("Authentication module", () => {
	it("should register new user", function (done) {
		this.timeout(10000);
		api.post("/api/users")
			.set("Content-Type", "application/json")
			.send({
				name: "test",
				email: "test@test.com",
				password: "test",
			})
			.end((err, res) => {
				res.body.should.have.property("user");
				res.body.user.name.should.equal("test");
				res.status.should.equal(200);
				done();
			});
	});
	it("should not register existing user", function (done) {
		this.timeout(10000);
		api.post("/api/users")
			.set("Content-Type", "application/json")
			.send({
				name: "test",
				email: "test@test.com",
				password: "test",
			})
			.end((err, res) => {
				res.status.should.equal(400);
				res.body.should.have.property("msg");
				done();
			});
	});
});
