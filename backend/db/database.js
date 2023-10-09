const { MongoClient } = require("mongodb");

const database = {
    accessDb: async function accessDb() {
        // eslint-disable-next-line
        let dsn = `mongodb+srv://Bruffe:${process.env.MONGODB_PASSWORD}@jsramverk.cpm6rtk.mongodb.net/?retryWrites=true&w=majority`;

        if (process.env.MONGODB_DB_NAME) {
            dsn = "mongodb://localhost:27017";
        }

        const client = new MongoClient(dsn);

        return client;
    }
};

module.exports = database;
