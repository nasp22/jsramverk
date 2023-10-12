const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const mocha = require('mocha');

chai.should();
chai.use(chaiHttp);

var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

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

    mocha.describe('Fetch codes with GraphQL', () => {
        mocha.it('should retrieve a list of codes', (done) => {
            chai.request(server)
                .post("/graphql")
                .send({ query: `
                { 
                    codes { 
                        Code, 
                        Level1Description, 
                        Level2Description, 
                        Level3Description 
                    } 
                }`
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.an("object");
                    res.body.data.codes.should.be.an("array");
                    res.body.data.codes.length.should.be.above(0);
                    done();
                });
        });
    });

    mocha.describe('Fetch delays with GraphQL', () => {
        mocha.it('should retrieve a list of delayed trains', (done) => {
            chai.request(server)
                .post("/graphql")
                .send({ query: `
                {
                    delays { 
                        ActivityId, 
                        ActivityType, 
                        AdvertisedTimeAtLocation, 
                        AdvertisedTrainIdent
                        Canceled
                        EstimatedTimeAtLocation
                        FromLocation {
                          LocationName
                          Priority
                          Order
                        }
                        LocationSignature
                        OperationalTrainNumber
                        ToLocation {
                          LocationName
                          Priority
                          Order
                        }
                        TrainOwner
                      }
                }`
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.delays.should.be.an("array");
                    res.body.data.delays.length.should.be.above(0);

                    done();
                });
        });
    });

    mocha.describe('Create new ticket with GraphQL', () => {
        mocha.it('should retrieve info about new ticket', (done) => {
            const requestBody = {
                query: `
                    mutation CreateNewTicket(
                        $code: String!, 
                        $trainnumber: String!, 
                        $traindate: String!
                        ) 
                        {
                        createTicket(
                            code: $code, 
                            trainnumber: $trainnumber, 
                            traindate: $traindate) 
                        {
                            _id
                            code
                            trainnumber
                            traindate
                        }
                    }`,
                variables: {
                    code: "Test",
                    trainnumber: "run",
                    traindate: datetime
                }
            };

            chai.request(server)
                .post("/graphql")
                .send(requestBody)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.createTicket.should.be.an("object");
                    res.body.data.createTicket.should.have.property("_id");
                    res.body.data.createTicket.should.have.property("code");
                    res.body.data.createTicket.should.have.property("trainnumber");
                    res.body.data.createTicket.should.have.property("traindate");
                    done();
                });
        });
    });

    mocha.describe('Fetch tickets with GraphQL', () => {
        mocha.it('should retrieve a list of all tickets', (done) => {
            chai.request(server)
                .get("/graphql")
                .send({ query: `
                {
                    tickets {
                        _id,
                        code,
                        trainnumber,
                        traindate
                    }
                }`
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.tickets.should.be.an("array");
                    res.body.data.tickets.length.should.be.above(0);

                    done();
                });
        });
    });
});
