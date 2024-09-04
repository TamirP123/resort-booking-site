const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
const express = require("express");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

console.log('Stripe Secret Key:', process.env.secret); // Debugging line

const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});

const startApolloServer = async () => {
    await server.start();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware}
    ))

    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')))
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'))
        })
    }

    const uri = process.env.MONGDB_URI;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true // For testing only, remove in production
    });

    async function connectToDatabase() {
      try {
        await client.connect();
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
      }
    }

    connectToDatabase();

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`GraphQL listening on http://localhost:${PORT}/graphql`);
        })
    })
}

startApolloServer();
