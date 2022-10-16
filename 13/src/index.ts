import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import {ApolloServer} from "apollo-server-express";
import typeDefs from "./gql/typeDefs";
import resolvers from "./gql/resolvers";


declare module "express-session" {
    interface Session {
        userId: any;
        loadedCount: Number;
    }
}

require("dotenv").config();
console.log(process.env.NODE_ENV)
const [config] = require("./../ormconfig");
export const dataSource = new DataSource(config);

const main = async () => {

    const app = express();
    app.use(
        cors({
            credentials: true,
            origin: process.env.CLIENT_URL,
        })
    );
    const router = express.Router();
    await dataSource.initialize();

    const redis = new Redis({
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    });

    const RedisStore = connectRedis(session);
    const redisStore = new RedisStore({
        client: redis,
    });

    app.use(bodyParser.json())

    app.use(
        session({
            store: redisStore,
            name: process.env.COOKIE_NAME,
            sameSite: "Strict",
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                path: "/",
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
            },
        } as any)
    );

    app.use(router);

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        context: ({ req, res }: any) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen({port: process.env.SERVER_PORT}, () => {
        console.log(`Serwer działa na porcie ${process.env.SERVER_PORT}`);
    });
}

main();