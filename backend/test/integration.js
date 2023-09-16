const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const trains = require('../models/trains.js');
const tickets = require('../models/tickets.js');
chai.should();
chai.use(chaiHttp);

var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

describe('Test integration to server and API', () => {
    describe('START /app/httpServer', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("string");
                    res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('GET /routes/codes.js', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/codes")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('GET /routes/delayed.js', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/delayed")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /routes/tickets.js', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/tickets")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /routes/tickets.js', () => {
        it('200 HAPPY PATH', (done) => {
            process.env.NODE_ENV = "test"
            let req = {
                body:{
                    code: "Test",
                    trainnumber: "run",
                    traindate: datetime
                }
            }
            res = tickets.createTicket(req)
            chai.request(server)
                .get("/tickets")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
