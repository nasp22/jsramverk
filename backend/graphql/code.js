const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const CodeType = new GraphQLObjectType({
    name: 'Code',
    description: 'This represents a code',
    fields: () => ({
        Code: { type: new GraphQLNonNull(GraphQLString) },
        Level1Description: { type: new GraphQLNonNull(GraphQLString) },
        Level2Description: { type: new GraphQLNonNull(GraphQLString) },
        Level3Description: { type: GraphQLString }
    })
});

module.exports = CodeType;
