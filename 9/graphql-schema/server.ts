import express from "express";
import {ApolloServer} from "apollo-server-express";
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();
// const pubsub = new PubS

const schema = makeExecutableSchema({
    typeDefs, resolvers
});

const apolloServer = new ApolloServer({
    schema,
    context: ({req, res}: any) => ({req, res}),
});

apolloServer.applyMiddleware({ app, cors: false });

app.listen({ port: 8000 }, () => {
    console.log("GraphQL Server is running on 8000 port.");
});


