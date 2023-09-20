const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
// const tickets = require('../models/tickets.js');
const mocha = require('mocha');

chai.should();
chai.use(chaiHttp);

// var currentdate = new Date();
// var datetime = currentdate.getDate() + "/"
//                 + (currentdate.getMonth()+1)  + "/"
//                 + currentdate.getFullYear() + " @ "
//                 + currentdate.getHours() + ":"
//                 + currentdate.getMinutes() + ":"
//                 + currentdate.getSeconds();

mocha.describe('Test integration to server and API', () => {
    mocha.describe('START /app/httpServer', () => {
        mocha.it('200 HAPPY PATH', (done) => {
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

    mocha.describe('GET /routes/codes.js', () => {
        mocha.it('200 HAPPY PATH', (done) => {
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

    mocha.describe('GET /routes/delayed.js', () => {
        mocha.it('200 HAPPY PATH', (done) => {
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

    mocha.describe('GET /routes/tickets.js', () => {
        mocha.it('200 HAPPY PATH', (done) => {
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

    // mocha.describe('POST /routes/tickets.js', () => {
    //     mocha.it('200 HAPPY PATH', (done) => {
    //         process.env.NODE_ENV = "test";
    //         let req = {
    //             body: {
    //                 code: "Test",
    //                 trainnumber: "run",
    //                 traindate: datetime
    //             }
    //         };

    //         let res = tickets.createTicket(req);

    //         chai.request(server)
    //             .get("/tickets")
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.an("object");
    //                 res.body.data.should.be.an("array");
    //                 res.body.data.length.should.be.above(0);

    //                 done();
    //             });
    //     });
    // });
});
