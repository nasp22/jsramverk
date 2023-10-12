const database = require('../db/database.js');
const collectionName = "tickets";
let dbName = "trains";

if (process.env.NODE_ENV === 'test') {
    dbName = "trains-test";
} else if (process.env.MONGODB_DB_NAME) {
    dbName = process.env.MONGODB_DB_NAME;
}

const tickets = {
    getTickets: async function getTickets() {
        // Access a MongoClient object
        const client = await database.accessDb();

        // Connect to the database
        await client.connect();

        // Get the database object
        const db = client.db(dbName);

        // Get the collection object
        const collection = db.collection(collectionName);

        // Get all documents (tickets) in the collection (trains)
        let allTickets = await collection.find().toArray();

        // Close the database connection
        await client.close();

        // Return all documents
        return allTickets;
    },

    createTicket: async function createTicket(req) {
        // Access a MongoClient object
        const client = await database.accessDb();

        // Connect to the database
        await client.connect();

        // Get the database object
        const db = client.db(dbName);

        // Get the collection object
        const collection = db.collection(collectionName);

        // Create new document (ticket) in the collection (trains)
        let newTicket = req.body;

        await collection.insertOne(newTicket);

        // Close the database connection
        await client.close();

        // Return the new document
        return newTicket;
    }
};

module.exports = tickets;
