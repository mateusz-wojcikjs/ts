import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import bodyParser from "body-parser";
import { DataSource } from "typeorm";
import {login, register} from "./repo/UserRepo";
import {createThread, getThreadsByCategoryId} from "./repo/ThreadRepo";

declare module "express-session" {
    interface Session {
        userId: any;
        loadedCount: Number;
    }
}

require("dotenv").config();
console.log(process.env.NODE_ENV)
const [config] = require("./../ormconfig");
const dataSource = new DataSource(config);

const main = async () => {

    const app = express();
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
    router.get("/", (req, res, next) => {
        if (!req.session!.userId) {
            req.session!.userId = req.query.userId;
            console.log("określono userId!");
            req.session!.loadedCount = 0;
        } else {
            req.session!.loadedCount = Number(req.session.loadedCount) + 1;
        }
        res.send(`userId: ${req.session!.userId}, loadedCount: ${req.session!.loadedCount}`)
    });
    app.post("/register", async (req, res, next) => {
        try {
            console.log("params", req.body);
            const userResult = await register(
                req.body.email,
                req.body.userName,
                req.body.password,
            );

            if (userResult && userResult.user) {
                res.send(`Utworzono nowego użytkownika o indentyfikatorze: ${userResult.user.id}`);
            } else if (userResult && userResult.messages) {
                res.send(userResult.messages[0]);
            } else {
                next();
            }
        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message);
            } else {
                console.error('Unexpected error', error);
            }
        }
    });

    router.post("/login", async (req, res, next) => {
       try {
           console.log("params", req.body);
           const userResult = await login(req.body.userName, req.body.password);
           if (userResult && userResult.user?.id) {
               req.session!.userId = userResult.user?.id;
               res.send(`Użytkownik się zalogował, userId: ${req.session!.userId}`);
           } else if (userResult && userResult.messages) {
               res.send(userResult.messages[0]);
           } else {
               next();
           }
       } catch (error) {
           if (error instanceof Error) {
               res.send(error.message);
           } else {
               console.error('Unexpected error', error);
           }
       }
    });

    router.post("/logout", async (req, res) => {
       try {
           const user = req.session!.userId;
           if (user) {
            req.session!.userId = null;
            res.send("Wylogowano")

           }
           if(!user) res.send("Nie wylogowano.");

       } catch (error) {
           if (error instanceof Error) {
               res.send(error.message);
           } else {
               console.error('Unexpected error', error);
           }
       }
    });

    router.post("/createthread", async (req, res, next) => {
        try {
            console.log("userId", req.session);
            console.log("body", req.body);
            const msg = await createThread(
                req.session!.userId,
                req.body.categoryId,
                req.body.title,
                req.body.body,
            );
            res.send(msg);
        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message);
            } else {
                console.error('Unexpected error', error);
            }
        }
    });

    app.post("/threadsbycategory", async (req, res, next) => {
        try {
            const threadResult = await getThreadsByCategoryId(req.body.categoryId);
            if (threadResult && threadResult.entities) {
                let items = "";
                threadResult.entities.forEach(th => {
                    items += th.title + ", ";
                });
                res.send(items);
            } else if (threadResult && threadResult.messages) {
                res.send(threadResult.messages[0]);
            }
        } catch (error) {
            if (error instanceof Error) {
                res.send(error.message);
            } else {
                console.error('Unexpected error', error);
            }
        }
    });

    app.listen({port: process.env.SERVER_PORT}, () => {
        console.log(`Serwer działa na porcie ${process.env.SERVER_PORT}`);
    });
}

main();