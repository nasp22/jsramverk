const { ObjectId } = require('mongodb');
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

    createTicket: async function createTicket(args) {
        // Access a MongoClient object
        const client = await database.accessDb();

        // Connect to the database
        await client.connect();

        // Get the database object
        const db = client.db(dbName);

        // Get the collection object
        const collection = db.collection(collectionName);

        // Create new document (ticket) in the collection (trains)
        let newTicket = args;

        await collection.insertOne(newTicket);

        // Close the database connection
        await client.close();

        // Return the new document
        return newTicket;
    },

    updateTicket: async function updateTicket(args) {
        // Access a MongoClient object
        const client = await database.accessDb();

        // Connect to the database
        await client.connect();

        // Get the database object
        const db = client.db(dbName);

        // Get the collection object
        const collection = db.collection(collectionName);

        // Update a document (ticket) in the collection (trains)

        const _id = new ObjectId(args._id);

        // Remove _id from the updated ticket to avoid modifying it
        delete args._id;

        // Update the document (ticket) by _id
        const updatedTicket = await collection.findOneAndUpdate(
            { _id: _id },
            { $set: args },
            { returnOriginal: false }
        );

        // Close the database connection
        await client.close();

        // Return the updated document
        return updatedTicket;
    },

    deleteTicket: async function deleteTicket(args) {
        // Access a MongoClient object
        const client = await database.accessDb();

        // Connect to the database
        await client.connect();

        // Get the database object
        const db = client.db(dbName);

        // Get the collection object
        const collection = db.collection(collectionName);

        // Delete a document (ticket) in the collection (trains)
        const _id = new ObjectId(args._id);

        const deletedTicket = await collection.findOneAndDelete({_id: _id});

        // Close the database connection
        await client.close();

        // Return the delete document
        return deletedTicket;
    }
};

module.exports = tickets;
