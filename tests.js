const supertest = require("supertest");
const server = require("./server");
const chai = require("chai");

chai.should();

const api = supertest.agent(server);

var test_token = "";
var test_id = "";
var test_genre = "";
var test_song = "";

describe("Authentication routes", () => {
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
	it("should authorize user", function (done) {
		this.timeout(10000);
		api.post("/api/auth")
			.set("Content-Type", "application/json")
			.send({
				email: "test@test.com",
				password: "test",
			})
			.end((err, res) => {
				res.body.should.have.property("user");
				res.body.should.have.property("token");
				res.status.should.equal(200);
				test_token = res.body.token;
				done();
			});
	});
	it("should get user data", function (done) {
		this.timeout(10000);
		api.get("/api/auth/user")
			.set("Accept", "application/json")
			.set("x-auth-token", test_token)
			.end((err, res) => {
				res.body.should.be.an("Object");
				res.status.should.equal(200);
				test_id = res.body._id;
				done();
			});
	});
	it("should get user by ID", function (done) {
		this.timeout(10000);
		api.get(`/api/users/${test_id}`)
			.set("Accept", "application/json")
			.set("x-auth-token", test_token)
			.end((err, res) => {
				res.body.should.be.an("Object");
				res.body.should.have.property("name");
				res.body.name.should.equal("test");
				res.status.should.equal(200);
				done();
			});
	});
});

describe("Songs routes", () => {
	it("should add new genre", function (done) {
		this.timeout(10000);
		api.post("/api/genres")
			.set("Content-Type", "application/json")
			.set("x-auth-token", test_token)
			.send({
				text: "TestGenre",
			})
			.end((err, res) => {
				res.body.should.be.an("Object");
				res.body.should.have.property("_id");
				res.body.text.should.equal("TestGenre");
				res.status.should.equal(200);
				test_genre = res.body._id;
				done();
			});
	});
	it("should add new song", function (done) {
		this.timeout(10000);
		api.post("/api/songs")
			.set("Content-Type", "application/json")
			.set("x-auth-token", test_token)
			.send({
				user: test_id,
				name: "TestSong",
				genre: test_genre,
				artistName: "TestArtist",
				filename: "http://test.server.com/test.mp3",
				artwork: "http://test.server.com/test.png",
				waveform: "http://test.server.com/test.json",
			})
			.end((err, res) => {
				res.body.should.be.an("Object");
				res.body.should.have.property("name");
				res.body.should.have.property("_id");
				res.body.name.should.equal("TestSong");
				test_song = res.body._id;
				res.status.should.equal(200);
				done();
			});
	});
	it("should update song title", function (done) {
		this.timeout(10000);
		api.post(`/api/songs/update/${test_song}`)
			.set("Content-Type", "application/json")
			.set("x-auth-token", test_token)
			.send({
				updatedSong: {
					name: "TestSongUpdated",
				},
			})
			.end((err, res) => {
				res.body.should.be.an("Object");
				res.body.should.have.property("name");
				res.body.name.should.equal("TestSongUpdated");
				res.status.should.equal(200);
				done();
			});
	});
	it("should get song list for user", function (done) {
		this.timeout(10000);
		api.get("/api/songs/user")
			.set("Accept", "application/json")
			.set("x-auth-token", test_token)
			.end((err, res) => {
				res.body.should.be.an("Array").with.lengthOf(1);
				res.body[0].should.have.property("name");
				res.status.should.equal(200);
				done();
			});
	});
});
