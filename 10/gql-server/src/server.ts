import {applyMiddleware} from "graphql-middleware";

const express = require("express");
import { createServer } from "http";
import { ApolloServer, makeExecutableSchema, PubSub } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {log} from "./Logger";

const app : any = express();
const pubsub = new PubSub();
const schema = makeExecutableSchema({
    typeDefs, resolvers
});
const schemaWithMiddleware = applyMiddleware(schema, log);
const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req, res }: any) => ({ req, res, pubsub }),
});

apolloServer.applyMiddleware({ app, cors: false });
const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 8000 }, () => {
    console.log("Serwer GraphQL został uruchominy - "
        + apolloServer.graphqlPath);
    console.log("Serwer subskrypcji GraphQL został uruchominy - "
        + apolloServer.subscriptionsPath);
});


