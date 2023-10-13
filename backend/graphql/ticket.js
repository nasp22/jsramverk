const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

const TicketType = new GraphQLObjectType({
    name: 'Ticket',
    description: 'This represents a ticket',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        trainnumber: { type: new GraphQLNonNull(GraphQLString) },
        traindate: { type: new GraphQLNonNull(GraphQLString) }
    })
});

module.exports = TicketType;
