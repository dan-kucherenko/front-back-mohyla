const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    mongoose.connect('mongodb://127.0.0.1:27017/company', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the DB");
            app.listen(4567, () => console.log(`Server is running on port 4567`));
        })
        .catch((error) => {
            console.error("Could not connect to the database", error);
            process.exit(1);
        });

    console.log(`🚀 Server ready at http://localhost:4567${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
