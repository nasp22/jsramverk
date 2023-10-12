const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const DelayedType = require("./delay.js");
const TicketType = require("./ticket.js");
const CodeType = require("./code.js");

// const trainsModel = require("../models/trains.js");
// const delayedModel = require("../models/delayed.js");
const delayedModel = require("../models/delayed.js");
const ticketsModel = require("../models/tickets.js");
const codesModel = require("../models/codes.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        delay: {
            type: DelayedType,
            description: 'A single delay',
            args: {
                OperationalTrainNumber: { type: GraphQLString }
            },
            resolve: async function (parent, args) {
                const delays = await delayedModel.getDelayedTrains();

                return delays.find(d => d.OperationalTrainNumber === args.OperationalTrainNumber);
            }
        },
        delays: {
            type: new GraphQLList(DelayedType),
            description: 'List of all delays',
            resolve: async function() {
                return await delayedModel.getDelayedTrains();
            }
        },
        ticket: {
            type: TicketType,
            description: 'A single ticket',
            args: {
                id: { type: GraphQLString }
            },
            resolve: async function (parent, args) {
                const tickets = await ticketsModel.getTickets();
                const ticket = await tickets.find(ticket => ticket._id.toString() === args.id);

                return ticket;
            }
        },
        tickets: {
            type: new GraphQLList(TicketType),
            description: 'List of all tickets',
            resolve: async function() {
                return await ticketsModel.getTickets();
            }
        },
        code: {
            type: CodeType,
            description: 'A single code',
            args: {
                Code: { type: GraphQLString }
            },
            resolve: async function (parent, args) {
                const codes = await codesModel.getCodes();
                const code = await codes.find(code => code.Code === args.Code);

                return code;
            }
        },
        codes: {
            type: new GraphQLList(CodeType),
            description: 'List of all codes',
            resolve: async function() {
                return await codesModel.getCodes();
            }
        },
    })
});

module.exports = RootQueryType;
