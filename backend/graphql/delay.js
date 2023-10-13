const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

const FromLocationType = new GraphQLObjectType({
    name: 'FromLocation',
    fields: () => ({
        LocationName: { type: new GraphQLNonNull(GraphQLString) },
        Priority: { type: new GraphQLNonNull(GraphQLString) },
        Order: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const ToLocationType = new GraphQLObjectType({
    name: 'ToLocation',
    fields: () => ({
        LocationName: { type: new GraphQLNonNull(GraphQLString) },
        Priority: { type: new GraphQLNonNull(GraphQLString) },
        Order: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const DelayedType = new GraphQLObjectType({
    name: 'Delay',
    description: 'This represents a delay',
    fields: () => ({
        ActivityId: { type: new GraphQLNonNull(GraphQLString) },
        ActivityType: { type: GraphQLString },
        AdvertisedTimeAtLocation: { type: GraphQLString },
        AdvertisedTrainIdent: { type: GraphQLString },
        Canceled: { type: GraphQLBoolean },
        EstimatedTimeAtLocation: { type: GraphQLString },
        FromLocation: { type: new GraphQLList(FromLocationType) },
        LocationSignature: { type: GraphQLString },
        OperationalTrainNumber: { type: new GraphQLNonNull(GraphQLString) },
        ToLocation: { type: new GraphQLList(ToLocationType) },
        TrainOwner: { type: GraphQLString }
    })
});

module.exports = DelayedType;
