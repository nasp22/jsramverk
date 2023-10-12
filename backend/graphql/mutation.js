const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const TicketType = require("./ticket.js");

const ticketsModel = require("../models/tickets.js");

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation for creation/updating/deletion',
    fields: () => ({
        createTicket: {
            type: TicketType,
            args: {
                code: { type: new GraphQLNonNull(GraphQLString) },
                trainnumber: { type: new GraphQLNonNull(GraphQLString) },
                traindate: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async function (parent, args) {
                const newTicket = await ticketsModel.createTicket(args);

                return newTicket;
            }
        },
        updateTicket: {
            type: TicketType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: GraphQLString },
                trainnumber: { type: GraphQLString },
                traindate: { type: GraphQLString },
            },
            resolve: async function (parent, args) {
                const updatedTicket = await ticketsModel.updateTicket(args);

                return updatedTicket;
            }
        },
        deleteTicket: {
            type: TicketType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async function (parent, args) {
                const deletedTicket = await ticketsModel.deleteTicket(args);

                return deletedTicket;
            }
        },
    })
});

module.exports = MutationType;
