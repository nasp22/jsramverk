const { MongoClient } = require("mongodb");

const database = {
    accessDb: async function accessDb() {
        let dsn = `mongodb+srv://Bruffe:${process.env.MONGODB_PASSWORD}@jsramverk \
        .cpm6rtk.mongodb.net/?retryWrites=true&w=majority`;

        console.log(process.env.MONGODB_DB_NAME);
        console.log(env.MONGODB_DB_NAME);
        console.log(MONGODB_DB_NAME);
        if (process.env.MONGODB_DB_NAME) {
            console.log("GitHub Actions env variable accessed");
            dsn = "mongodb://localhost:27017";
        }
        const client = new MongoClient(dsn);

        return client;
    }
};

module.exports = database;
