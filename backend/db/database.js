const { MongoClient } = require("mongodb");

const database = {
    accessDb: async function accessDb() {
        let dsn = `mongodb+srv://Bruffe:${process.env.MONGODB_PASSWORD}@jsramverk \
        .cpm6rtk.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(dsn);

        return client;
    }
};

module.exports = database;
