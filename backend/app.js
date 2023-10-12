require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetchTrainPositions = require('./models/trains.js');
const app = express();
const httpServer = require("http").createServer(app);
const visual = false;
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema
} = require("graphql");

const RootQueryType = require("./graphql/root.js");
const MutationType = require("./graphql/mutation.js");

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const io = require("socket.io")(httpServer, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://www.student.bth.se",
            "https://www.student.bth.se:1"
        ],
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 1337;

app.get('/', (req, res) => {
    res.json({
        data: 'Hello World!'
    });
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual, // Visual är satt till true under utveckling
}));

const server = httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

fetchTrainPositions(io);
module.exports = server;
