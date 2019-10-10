var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Checks Login API and returns status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/login')
        .send({
            "email": "johndoe@gmail.com",
            "password": "1234"
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("Checks Register API and returns status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/register')
        .send({
            "first_name": "JaneTest",
            "last_name": "DaneTest",
            "email": "janedane@gmail.com",
            "password": "qwert12345"
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("Checks API of Restaurant Orders", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/order/restaurant/1')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("Checks API of Restaurant Menu", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/restaurant/menu/1')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})

it("Checks API of Restaurant Details", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/restaurant/2')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
})